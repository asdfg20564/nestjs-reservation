import { Role } from 'src/user/types/userRole.type';

import { SetMetadata } from '@nestjs/common';

//userrole에서 정의한 role들을 여러 개 받아 메타데이타의 roles라는 key에 저장된다.
//어떤 role에서 어떤 api를 부를 수 있는지 정의
export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);