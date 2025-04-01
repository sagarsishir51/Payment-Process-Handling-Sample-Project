import {PaginationProps} from 'src/common/types/pagination.types';
import {Role} from 'src/core/domain/role/role.domain';

export abstract class RoleUseCase {
  abstract getAllRoles(
    options: Partial<Role>,
    filter: PaginationProps,
  ): Promise<[Role[], number]>;
  abstract getRoleById(id: Role['roleId']): Promise<Role>;
  abstract createRole(data: Role): Promise<Role>;
  abstract createBulkRole(data: Role[]): Promise<Role[]>;
  abstract updateRoleById(
    id: Role['roleId'],
    data: Partial<Role>,
  ): Promise<void>;
  abstract checkRoleExistsOrFail(
    options: Partial<Role>[],
  ): Promise<boolean | never>;
  abstract countRoles(options?: Partial<Role>): Promise<number>;
}
