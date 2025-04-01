import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, ILike, Repository} from 'typeorm';
import {RoleEntity} from './role.entity';
import {PaginationProps} from 'src/common/types/pagination.types';
import {Role} from 'src/core/domain/role/role.domain';
import {RoleRepository} from 'src/core/ports/out/role/role-repository.port';
import {getPaginationSortParams} from 'src/utils/util.index';

@Injectable()
export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async findAllRoles(
    options: Partial<Role>[],
    filter: PaginationProps,
  ): Promise<[Role[], number]> {
    const baseCondition = (options: Partial<Role>) => [
      { roleName: ILike(`%${filter?.search || ''}%`), ...options },
    ];

    const condition: FindOptionsWhere<Role>[] = options?.flatMap((opt) =>
      baseCondition(opt),
    );

    const roles = await this.roleRepository.find({
      where: condition,
      relations: {
        privileges: true,
      },
      ...getPaginationSortParams(filter),
    });

    const count = await this.roleRepository.count({ where: condition });

    return [Role.toDomains(roles), count] as [Role[], number];
  }

  async findRole(options: Partial<Role>): Promise<Role> {
    return Role.toDomain(
      await this.roleRepository.findOneOrFail({
        where: options,
        relations: {
          privileges: true,
        },
      }),
    );
  }

  async createRole(data: Role): Promise<Role> {
    return Role.toDomain(
      await this.roleRepository.save(this.roleRepository.create(data)),
    );
  }

  async createBulkRole(data: Role[]): Promise<Role[]> {
    return Role.toDomains(
      await this.roleRepository.save(this.roleRepository.create(data)),
    );
  }

  async updateRole(
    options: Pick<Role, 'roleId'>,
    data: Partial<Role>,
  ): Promise<void> {
    await this.roleRepository.update(options, data);
  }

  async saveRole(data: Role): Promise<Role> {
    return Role.toDomain(await this.roleRepository.save(data));
  }

  async roleExists(options: Partial<Role>[]): Promise<boolean> {
    return await this.roleRepository.existsBy(options);
  }

  async countRoles(options: Partial<Role>): Promise<number> {
    return await this.roleRepository.countBy(options);
  }
}
