import {PaginationProps} from 'src/common/types/pagination.types';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';

export abstract class PrivilegeUseCase {
  abstract getAllPrivileges(
    options: Partial<Privilege>,
    filter: PaginationProps,
  ): Promise<[Privilege[], number]>;
  abstract getPrivilegeById(id: Privilege['privilegeId']): Promise<Privilege>;
  abstract createPrivilege(data: Privilege): Promise<Privilege>;
  abstract createBulkPrivilege(data: Privilege[]): Promise<Privilege[]>;
  abstract checkPrivilegeExistsOrFail(
    options: Partial<Privilege>[],
  ): Promise<boolean | never>;
  abstract countPrivileges(options?: Partial<Privilege>): Promise<number>;
}
