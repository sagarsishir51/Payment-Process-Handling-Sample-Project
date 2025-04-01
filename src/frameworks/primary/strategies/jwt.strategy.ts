import {Injectable, UnauthorizedException} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {UserUseCase} from 'src/core/ports/in/user/user-usecase.port';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userUseCase: UserUseCase,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('auth.secret'),
    });
  }

  async validate(payload: any) {
    try {
      const user = await this.userUseCase.getUserById(payload?.sub);

      if (user.userStatus === USER_STATUS.ARCHIVED)
        throw new UnauthorizedException();

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }
}
