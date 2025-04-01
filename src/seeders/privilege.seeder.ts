import {Injectable, Logger} from '@nestjs/common';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {PrivilegeUseCase} from 'src/core/ports/in/privilege/privilege-usecase.port';
import {PRIVILEGE_GROUP, PRIVILEGE_NAME,} from 'src/common/enums/privilege/privilege.enum';

@Injectable()
export class PrivilegeSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly privilegeUseCase: PrivilegeUseCase,
  ) {}

  async seed() {
    if ((await this.privilegeUseCase.countPrivileges({})) > 0) {
      const [privileges] = await this.privilegeUseCase.getAllPrivileges(
        {},
        {
          pagination: false,
        },
      );

      return privileges;
    }

    const privileges = [];

    Object.entries(PRIVILEGE_GROUP).forEach(
      ([privilegeName, subPrivileges]) => {
        Object.values(subPrivileges).forEach((privilegeSubName) => {
          privileges.push(
            Privilege.create({
              privilegeName: privilegeName as PRIVILEGE_NAME,
              privilegeSubName,
            }),
          );
        });
      },
    );

    const createdPrivileges =
      await this.privilegeUseCase.createBulkPrivilege(privileges);

    this.logger.debug(
      'No. of privileges created : ' + createdPrivileges.length,
    );

    return createdPrivileges;
  }
}
