import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {User} from 'src/core/domain/user/user.domain';
import {RoleUseCase} from 'src/core/ports/in/role/role-usecase.port';
import {PRIVILEGE_SUBNAME} from 'src/common/enums/privilege/privilege.enum';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly roleUseCase: RoleUseCase,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const privilegeArr = this.reflector.getAllAndOverride<string[]>(
      'privileges',
      [context.getClass(), context.getHandler()],
    );

    if (!privilegeArr) return true;

    const request = context.switchToHttp().getRequest();

    const user: User = request.user;

    const role = await this.roleUseCase.getRoleById(user.role.roleId);

    const privileges =
      role?.privileges?.map((privilege) => privilege.privilegeSubName) || [];

    return privilegeArr.some((privilege) => {
      return privileges.includes(PRIVILEGE_SUBNAME[privilege]);
    });
  }
}
