import { Role } from 'src/user/types/userRole.type';

import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';

//authguard 즉 로그인이 기본적으로 된 상황에서 roles guard 실시
@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    //authenticated 먼저 확인
    const authenticated = await super.canActivate(context);
    if (!authenticated) {
      return false;
    }

    //role에 따른 guard
    //reflector 메타 데이터 탐색. 키 값을(roles) 통해 가져온다.
    //데코레이터에서 가져오는 값을 메타데이터에 저장하도록 만들었다. (reflect 객체에 저장된다.)
    //ex) @Roles(Role.Admin, Role.Admin ...) => 'roles'에 저장된 값 = [Role.Admin, Role.Admin2 ...]
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles', [
      context.getHandler(),
      context.getClass(),
    ]);


    //role check 없다면 role 체크 없이 jwt 인증만으로 true
    if (!requiredRoles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    //해당 배열에 포함되는 role이라면 true
    return requiredRoles.some((role) => user.is_admin === role);
  }
}