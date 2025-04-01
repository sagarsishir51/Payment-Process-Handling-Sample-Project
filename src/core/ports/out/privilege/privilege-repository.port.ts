import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {PaginationProps} from 'src/common/types/pagination.types';

export abstract class PrivilegeRepository {
  abstract findAllPrivileges(
    options: Partial<Privilege>[],
    filter: PaginationProps,
  ): Promise<[Privilege[], number]>;
  abstract findPrivilege(options: Partial<Privilege>): Promise<Privilege>;
  abstract createPrivilege(data: Privilege): Promise<Privilege>;
  abstract createBulkPrivilege(data: Privilege[]): Promise<Privilege[]>;
  abstract updatePrivilege(
    options: Pick<Privilege, 'privilegeId'>,
    data: Partial<Privilege>,
  ): Promise<void>;
  abstract savePrivilege(data: Privilege): Promise<Privilege>;
  abstract countPrivileges(options: Partial<Privilege>): Promise<number>;
  abstract privilegeExists(options: Partial<Privilege>[]): Promise<boolean>;
}
