import {BadRequestException, Injectable} from '@nestjs/common';
import {PaginationProps} from 'src/common/types/pagination.types';
import {Privilege} from 'src/core/domain/privilege/privilege.domain';
import {PrivilegeUseCase} from 'src/core/ports/in/privilege/privilege-usecase.port';
import {PrivilegeRepository} from 'src/core/ports/out/privilege/privilege-repository.port';

@Injectable()
export class PrivilegeUseCaseImpl implements PrivilegeUseCase {
  constructor(private readonly privilegeRepository: PrivilegeRepository) {}

  async getAllPrivileges(
    options: Partial<Privilege>,
    filter: PaginationProps,
  ): Promise<[Privilege[], number]> {
    return await this.privilegeRepository.findAllPrivileges([options], filter);
  }

  async getPrivilegeById(
    privilegeId: Privilege['privilegeId'],
  ): Promise<Privilege> {
    await this.checkPrivilegeExistsOrFail([{ privilegeId }]);

    return await this.privilegeRepository.findPrivilege({ privilegeId });
  }

  async createPrivilege(data: Privilege): Promise<Privilege> {
    return await this.privilegeRepository.createPrivilege(data);
  }

  async createBulkPrivilege(data: Privilege[]): Promise<Privilege[]> {
    return await this.privilegeRepository.createBulkPrivilege(data);
  }

  async updatePrivilegeById(
    privilegeId: Privilege['privilegeId'],
    data: Partial<Privilege>,
  ): Promise<void> {
    await this.checkPrivilegeExistsOrFail([{ privilegeId }]);

    return await this.privilegeRepository.updatePrivilege(
      { privilegeId },
      data,
    );
  }

  async checkPrivilegeExistsOrFail(
    options: Partial<Privilege>[],
  ): Promise<boolean> {
    if (await this.privilegeRepository.privilegeExists(options)) return true;

    throw new BadRequestException('Privilege does not exist');
  }

  async countPrivileges(options?: Partial<Privilege>): Promise<number> {
    return await this.privilegeRepository.countPrivileges(options);
  }
}
