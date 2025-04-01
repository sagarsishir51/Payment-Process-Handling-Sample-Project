import {Role} from 'src/core/domain/role/role.domain';
import {PaginationProps} from 'src/common/types/pagination.types';

export abstract class RoleRepository {
  abstract findAllRoles(
    options: Partial<Role>[],
    filter: PaginationProps,
  ): Promise<[Role[], number]>;
  abstract findRole(options: Partial<Role>): Promise<Role>;
  abstract createRole(data: Role): Promise<Role>;
  abstract createBulkRole(data: Role[]): Promise<Role[]>;
  abstract updateRole(
    options: Pick<Role, 'roleId'>,
    data: Partial<Role>,
  ): Promise<void>;
  abstract saveRole(data: Role): Promise<Role>;
  abstract countRoles(options: Partial<Role>): Promise<number>;
  abstract roleExists(options: Partial<Role>[]): Promise<boolean>;
}
