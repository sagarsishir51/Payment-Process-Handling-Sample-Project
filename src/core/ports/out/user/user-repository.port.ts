import {User} from 'src/core/domain/user/user.domain';
import {PaginationProps} from 'src/common/types/pagination.types';

export abstract class UserRepository {
  abstract findAllUsers(
    options: Partial<User>[],
    filter: PaginationProps,
  ): Promise<[User[], number]>;
  abstract findUser(options: Partial<User>): Promise<User>;
  abstract findUserWithPrivileges(options: Partial<User>): Promise<User>;
  abstract findUserPassword(
    options: Pick<User, 'userId'> | Pick<User, 'email'> | Pick<User, 'phone'>,
  ): Promise<string>;
  abstract createUser(data: User): Promise<User>;
  abstract createBulkUser(data: User[]): Promise<User[]>;
  abstract updateUser(
    options: Pick<User, 'userId'> | Pick<User, 'email'> | Pick<User, 'phone'>,
    data: Partial<User>,
  ): Promise<void>;
  abstract saveUser(data: User): Promise<User>;
  abstract countUsers(options: Partial<User>): Promise<number>;
  abstract userExists(options: Partial<User>[]): Promise<boolean>;
}
