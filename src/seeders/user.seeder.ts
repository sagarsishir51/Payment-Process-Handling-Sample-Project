import {Injectable, Logger} from '@nestjs/common';
import {Role} from 'src/core/domain/role/role.domain';
import {User} from 'src/core/domain/user/user.domain';
import {UserUseCase} from 'src/core/ports/in/user/user-usecase.port';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

@Injectable()
export class UserSeeder {
  constructor(
    private readonly logger: Logger,
    private readonly userUseCase: UserUseCase,
  ) {}

  async seedSuperAdminUser(role: Role) {
    if (
      (await this.userUseCase.countUsers({ email: 'superadmin@gmail.com' })) > 0
    ) {
      return await this.userUseCase.getUserByEmail('superadmin@gmail.com');
    }

    const createdUser = await this.userUseCase.createUser(
      User.create({
        userName: 'Super Admin',
        email: 'superadmin@gmail.com',
        phone: '0000000000',
        password: '12345',
        userStatus: USER_STATUS.VERIFIED,
        role,
      }),
    );

    this.logger.debug(
      'Super Admin created : ' + JSON.stringify(createdUser, null, 2),
    );

    return createdUser;
  }
}
