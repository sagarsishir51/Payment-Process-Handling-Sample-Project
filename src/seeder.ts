import {Injectable, Logger} from '@nestjs/common';
import {RoleSeeder} from './seeders/role.seeder';
import {UserSeeder} from './seeders/user.seeder';
import {PrivilegeSeeder} from './seeders/privilege.seeder';

@Injectable()
export class Seeder {
  constructor(
    private readonly logger: Logger,
    private readonly roleSeeder: RoleSeeder,
    private readonly userSeeder: UserSeeder,
    private readonly privilegeSeeder: PrivilegeSeeder,
  ) {}
  async seed() {
    try {
      const privileges = await this.privilegeSeeder.seed();

      const role = await this.roleSeeder.seed(privileges);

      await this.userSeeder.seedSuperAdminUser(role);

      return Promise.resolve(true);
    } catch (error) {
      this.logger.error('Failed seeding...');
      return Promise.reject(error);
    }
  }
}
