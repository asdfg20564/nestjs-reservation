import { createParamDecorator, ExecutionContext } from '@nestjs/common';

//ctx : context : 현재의 request를 가져온다. middleware에 req.user에 저장되어있는 값을 가져올 수 있음
export const UserInfo = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user ? request.user : null;
  },
);