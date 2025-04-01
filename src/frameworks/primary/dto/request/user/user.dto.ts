import {ApiProperty, PartialType} from '@nestjs/swagger';
import {IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString,} from 'class-validator';
import {Transform} from 'class-transformer';
import {QueryDto} from '../query.dto';
import {USER_STATUS} from 'src/common/enums/user/user.enum';

export class QueryUserDto extends QueryDto {
  @ApiProperty({ required: false })
  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  @IsOptional()
  roleId?: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  roleName?: string;

  @ApiProperty({ required: false, enum: USER_STATUS })
  @IsEnum(USER_STATUS)
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  userStatus?: USER_STATUS;

  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;
}

export class CreateUserDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  userName?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ required: false })
  @IsPhoneNumber('NP')
  @IsOptional()
  phone?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsEnum(USER_STATUS)
  @IsOptional()
  userStatus?: USER_STATUS;
}
