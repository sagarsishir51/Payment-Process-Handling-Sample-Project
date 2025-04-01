import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {PrivilegeEntity} from './privilege.entity';
import {PaginationProps} from 'src/common/types/pagination.types';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {PrivilegeRepository} from 'src/core/ports/out/privilege/privilege-repository.port';
import {getPaginationSortParams} from 'src/utils/util.index';

@Injectable()
export class PrivilegeRepositoryImpl implements PrivilegeRepository {
  constructor(
    @InjectRepository(PrivilegeEntity)
    private readonly privilegeRepository: Repository<PrivilegeEntity>,
  ) {}

  async findAllPrivileges(
    options: Partial<Privilege>[],
    filter: PaginationProps,
  ): Promise<[Privilege[], number]> {
    const privileges = await this.privilegeRepository.find({
      where: options,
      ...getPaginationSortParams(filter),
    });

    const count = await this.privilegeRepository.count({ where: options });

    return [Privilege.toDomains(privileges), count] as [Privilege[], number];
  }

  async findPrivilege(options: Partial<Privilege>): Promise<Privilege> {
    return Privilege.toDomain(
      await this.privilegeRepository.findOneOrFail({
        where: options,
      }),
    );
  }

  async createPrivilege(data: Privilege): Promise<Privilege> {
    return Privilege.toDomain(
      await this.privilegeRepository.save(
        this.privilegeRepository.create(data),
      ),
    );
  }

  async createBulkPrivilege(data: Privilege[]): Promise<Privilege[]> {
    return Privilege.toDomains(
      await this.privilegeRepository.save(
        this.privilegeRepository.create(data),
      ),
    );
  }

  async updatePrivilege(
    options: Pick<Privilege, 'privilegeId'>,
    data: Partial<Privilege>,
  ): Promise<void> {
    await this.privilegeRepository.update(options, data);
  }

  async savePrivilege(data: Privilege): Promise<Privilege> {
    return Privilege.toDomain(await this.privilegeRepository.save(data));
  }

  async privilegeExists(options: Partial<Privilege>[]): Promise<boolean> {
    return await this.privilegeRepository.existsBy(options);
  }

  async countPrivileges(options: Partial<Privilege>): Promise<number> {
    return await this.privilegeRepository.countBy(options);
  }
}
