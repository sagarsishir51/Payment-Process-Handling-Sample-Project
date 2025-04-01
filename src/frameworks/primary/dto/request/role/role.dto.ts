import {ApiProperty, PartialType} from '@nestjs/swagger';
import {ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsOptional, IsString,} from 'class-validator';
import {QueryDto} from '../query.dto';

export class QueryRoleDto extends QueryDto {
  @ApiProperty({ required: false })
  @IsOptional()
  search?: string;
}

export class CreateRoleDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roleName: string;

  @ApiProperty()
  @IsArray()
  @IsInt({ each: true })
  @ArrayNotEmpty()
  @IsNotEmpty()
  privilegeIds: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
