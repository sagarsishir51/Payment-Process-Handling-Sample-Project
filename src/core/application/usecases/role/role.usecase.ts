import {BadRequestException, Injectable} from '@nestjs/common';
import {PaginationProps} from 'src/common/types/pagination.types';
import {Role} from 'src/core/domain/role/role.domain';
import {RoleUseCase} from 'src/core/ports/in/role/role-usecase.port';
import {RoleRepository} from 'src/core/ports/out/role/role-repository.port';

@Injectable()
export class RoleUseCaseImpl implements RoleUseCase {
  constructor(private readonly roleRepository: RoleRepository) {}

  async getAllRoles(
    options: Partial<Role>,
    filter: PaginationProps,
  ): Promise<[Role[], number]> {
    return await this.roleRepository.findAllRoles([options], filter);
  }

  async getRoleById(roleId: Role['roleId']): Promise<Role> {
    await this.checkRoleExistsOrFail([{ roleId }]);

    return await this.roleRepository.findRole({ roleId });
  }

  async createRole(data: Role): Promise<Role> {
    return await this.roleRepository.createRole(data);
  }

  async createBulkRole(data: Role[]): Promise<Role[]> {
    return await this.roleRepository.createBulkRole(data);
  }

  async updateRoleById(
    roleId: Role['roleId'],
    data: Partial<Role>,
  ): Promise<void> {
    await this.checkRoleExistsOrFail([{ roleId }]);

    await this.roleRepository.saveRole(
      Object.assign(new Role(), { ...data, roleId }),
    );
  }

  async checkRoleExistsOrFail(options: Partial<Role>[]): Promise<boolean> {
    if (await this.roleRepository.roleExists(options)) return true;

    throw new BadRequestException('Role does not exist');
  }

  async countRoles(options?: Partial<Role>): Promise<number> {
    return await this.roleRepository.countRoles(options);
  }
}
