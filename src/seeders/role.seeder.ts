import {Injectable, Logger} from '@nestjs/common';
import {Role} from 'src/core/domain/role/role.domain';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {RoleUseCase} from 'src/core/ports/in/role/role-usecase.port';

@Injectable()
export class RoleSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly roleUseCase: RoleUseCase,
  ) {}

  async seed(privileges: Privilege[]) {
    if ((await this.roleUseCase.countRoles({})) > 0) {
      const [roles] = await this.roleUseCase.getAllRoles(
        { roleName: 'SUPERADMIN' },
        { pagination: false },
      );

      return roles?.[0];
    }

    const role = await this.roleUseCase.createRole(
      Role.create({
        roleName: 'SUPERADMIN',
        privileges,
      }),
    );

    this.logger.debug('Roles created : ' + JSON.stringify(role, null, 2));

    return role;
  }
}
