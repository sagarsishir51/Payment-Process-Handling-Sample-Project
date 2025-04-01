import {z} from 'zod';
import {plainToInstance, Type} from 'class-transformer';
import {Privilege} from '../privilege/privilege.domain';
import {CreateRoleProps, UpdateRoleProps} from './role.types';

export class Role {
  roleId: number;

  roleName: string;

  @Type(() => Privilege)
  privileges: Privilege[];

  createdAt: Date;

  updatedAt: Date;

  static readonly #validator = z.object({
    roleName: z.string(),
    privileges: z.array(z.instanceof(Privilege)).optional(),
  });

  static create(createRoleProps: CreateRoleProps) {
    return plainToInstance(Role, this.#validator.parse(createRoleProps), {
      exposeUnsetFields: false,
    });
  }

  static update(updateRoleProps: UpdateRoleProps) {
    return plainToInstance(
      Role,
      this.#validator.partial().parse(updateRoleProps),
      { exposeUnsetFields: false },
    );
  }

  static toDomain(role: Role) {
    return plainToInstance(Role, role, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
    });
  }

  static toDomains(roles: Role[]) {
    return roles?.map(this.toDomain);
  }
}
