import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiBearerAuth, ApiTags} from '@nestjs/swagger';
import {AuthUseCase} from 'src/core/ports/in/auth/auth-usecase.port';
import {Public} from '../../decorators/public.decorator';
import {ResponseDto} from '../../dto/response/response.dto';
import {ChangePasswordDto, LoginDto,} from '../../dto/request/auth/auth.dto';
import {AuthUser} from '../../decorators/user.decorator';
import {User} from 'src/core/domain/user/user.domain';

@ApiTags('/auth')
@Controller('/auth')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}

  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    const data = await this.authUseCase.login(loginDto);

    return new ResponseDto('Login Successful', data);
  }

  @ApiBearerAuth()
  @Post('change-password')
  async changePassword(
    @Body()
    changePasswordDto: ChangePasswordDto,
    @AuthUser() user: User,
  ) {
    await this.authUseCase.changePasswordById(user.userId, changePasswordDto);

    return new ResponseDto('Password Changed Successfully');
  }

  @ApiBearerAuth()
  @Get('profile')
  async getProfile(@AuthUser() user: User) {
    return new ResponseDto(
      'Profile Fetched',
      await this.authUseCase.getProfileById(user.userId),
    );
  }

}
