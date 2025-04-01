import {BadRequestException, Injectable, NotFoundException,} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import {User} from 'src/core/domain/user/user.domain';
import {AuthUseCase} from 'src/core/ports/in/auth/auth-usecase.port';
import {UserRepository} from 'src/core/ports/out/user/user-repository.port';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

@Injectable()
export class AuthUseCaseImpl implements AuthUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  async login({ email, password }: Pick<User, 'email' | 'password'>): Promise<{
    token: string;
    user: User;
  }> {
    const user = await this.userRepository.findUserWithPrivileges({ email });

    if (user.userStatus === USER_STATUS.ARCHIVED)
      throw new NotFoundException('User does not exist');

    const userPassword = await this.userRepository.findUserPassword({
      email: user.email,
    });

    const isMatched = await bcrypt.compare(password, userPassword);

    if (!isMatched) throw new BadRequestException('Incorrect Password');

    const payload = { sub: user.userId };

    return {
      token: await this.jwtService.signAsync(payload),
      user,
    };
  }

  async getProfileById(userId: User['userId']) {
    return await this.userRepository.findUserWithPrivileges({ userId });
  }

  async changePasswordById(
    userId: User['userId'],
    {
      newPassword,
      oldPassword,
    }: {
      newPassword: string;
      oldPassword: string;
    },
  ): Promise<void> {
    const currentPassword = await this.userRepository.findUserPassword({
      userId,
    });

    const isMatched = await bcrypt.compare(oldPassword, currentPassword);

    if (!isMatched) throw new BadRequestException('Incorrect Password');

    const salt = await bcrypt.genSalt(10);

    const encryptedPassword = await bcrypt.hash(newPassword, salt);

    await this.userRepository.updateUser(
      { userId },
      {
        password: encryptedPassword,
      },
    );
  }

}
