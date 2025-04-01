import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, ILike, Repository} from 'typeorm';
import {UserEntity} from './user.entity';
import {PaginationProps} from 'src/common/types/pagination.types';
import {User} from 'src/core/domain/user/user.domain';
import {UserRepository} from 'src/core/ports/out/user/user-repository.port';
import {getPaginationSortParams} from 'src/utils/util.index';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findAllUsers(
    options: Partial<User>[],
    filter: PaginationProps,
  ): Promise<[User[], number]> {
    const baseCondition = (options: Partial<User>) => [
      { userName: ILike(`%${filter?.search || ''}%`), ...options },
      { email: ILike(`%${filter?.search || ''}%`), ...options },
      { phone: ILike(`%${filter?.search || ''}%`), ...options },
    ];

    const condition: FindOptionsWhere<User>[] = options?.flatMap((opt) =>
      baseCondition(opt),
    );

    const users = await this.userRepository.find({
      where: condition,
      relations: {
        role: true,
      },
      ...getPaginationSortParams(filter),
    });

    const count = await this.userRepository.count({ where: condition });

    return [User.toDomains(users), count] as [User[], number];
  }

  async findUser(options: Partial<User>): Promise<User> {
    return User.toDomain(
      await this.userRepository.findOneOrFail({
        where: options,
        relations: {
          role: true,
        },
      }),
    );
  }

  async findUserWithPrivileges(options: Partial<User>): Promise<User> {
    return User.toDomain(
      await this.userRepository.findOneOrFail({
        where: options,
        relations: {
          role: {
            privileges: true,
          },
        },
      }),
    );
  }

  async findUserPassword(
    condition: Pick<User, 'userId'> | Pick<User, 'email'> | Pick<User, 'phone'>,
  ): Promise<string> {
    const user = await this.userRepository.findOneOrFail({
      where: condition,
      select: {
        password: true,
      },
    });

    return user.password;
  }

  async createUser(data: User): Promise<User> {
    return User.toDomain(
      await this.userRepository.save(this.userRepository.create(data)),
    );
  }

  async createBulkUser(data: User[]): Promise<User[]> {
    return User.toDomains(
      await this.userRepository.save(this.userRepository.create(data)),
    );
  }

  async updateUser(
    options: Pick<User, 'userId'> | Pick<User, 'email'> | Pick<User, 'phone'>,
    data: Partial<User>,
  ): Promise<void> {
    await this.userRepository.update(options, data);
  }

  async saveUser(data: User): Promise<User> {
    return User.toDomain(await this.userRepository.save(data));
  }

  async userExists(options: Partial<User>[]): Promise<boolean> {
    return await this.userRepository.existsBy(options);
  }

  async countUsers(options: Partial<User>): Promise<number> {
    return await this.userRepository.countBy(options);
  }
}
