import {Global, Module} from '@nestjs/common';
import {PassportModule} from '@nestjs/passport';
import {ConfigModule, ConfigService} from '@nestjs/config';
import {JwtModule} from '@nestjs/jwt';
import {AuthUseCaseImpl} from 'src/core/application/usecases/auth/auth.usecase';
import {AuthUseCase} from 'src/core/ports/in/auth/auth-usecase.port';
import {AuthController} from 'src/frameworks/primary/controllers/auth/auth.controller';
import {AllConfig} from 'src/infrastructure/config/config.type';
import {JwtStrategy} from 'src/frameworks/primary/strategies/jwt.strategy';
import {UserModule} from '../user/user.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService<AllConfig>) => ({
        secret: configService.get('auth.secret', { infer: true }),
        signOptions: {
          expiresIn: configService.get('auth.expires', { infer: true }),
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: AuthUseCase,
      useClass: AuthUseCaseImpl,
    },
    JwtStrategy,
  ],
  exports: [AuthUseCase],
})
export class AuthModule {}
