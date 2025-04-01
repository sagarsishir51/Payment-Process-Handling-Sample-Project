import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsNotEmpty, IsOptional, IsString} from 'class-validator';

export class LoginDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  newPassword: string;
}

export class UpdateProfileDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image?: string;
}
