import {User} from 'src/core/domain/user/user.domain';

export abstract class AuthUseCase {
  abstract login(
    data: Pick<User, 'email' | 'password'>,
  ): Promise<{ token: string }>;
  abstract getProfileById(userId: User['userId']): Promise<User>;
  abstract changePasswordById(
    userId: User['userId'],
    data: { newPassword: string; oldPassword: string },
  ): Promise<void>;
}
