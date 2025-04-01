import {z} from 'zod';
import {plainToInstance} from 'class-transformer';
import {Role} from '../role/role.domain';
import {CreatePrivilegeProps, UpdatePrivilegeProps} from './privilege.types';
import {PRIVILEGE_NAME, PRIVILEGE_SUBNAME,} from 'src/common/enums/privilege/privilege.enum';

export class Privilege {
  privilegeId: number;
  privilegeName: PRIVILEGE_NAME;
  privilegeSubName: PRIVILEGE_SUBNAME;
  roles: Role[];
  createdAt: Date;
  updatedAt: Date;

  static readonly #validator = z.object({
    privilegeName: z.nativeEnum(PRIVILEGE_NAME),
    privilegeSubName: z.nativeEnum(PRIVILEGE_SUBNAME),
  });

  static create(createPrivilegeProps: CreatePrivilegeProps) {
    return plainToInstance(
      Privilege,
      this.#validator.parse(createPrivilegeProps),
      {
        exposeUnsetFields: false,
      },
    );
  }

  static update(updatePrivilegeProps: UpdatePrivilegeProps) {
    return plainToInstance(
      Privilege,
      this.#validator.partial().parse(updatePrivilegeProps),
      { exposeUnsetFields: false },
    );
  }

  static toDomain(privilege: Privilege) {
    return plainToInstance(Privilege, privilege, {
      exposeUnsetFields: false,
    });
  }

  static toDomains(privileges: Privilege[]) {
    return privileges?.map(this.toDomain);
  }
}
