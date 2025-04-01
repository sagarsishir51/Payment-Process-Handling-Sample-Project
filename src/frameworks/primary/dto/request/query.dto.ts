import {ApiProperty} from '@nestjs/swagger';
import {Transform} from 'class-transformer';
import {IsBoolean, IsEnum, IsInt, IsOptional, IsString,} from 'class-validator';

export class QueryDto {
  @ApiProperty({ required: false, default: true })
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @IsOptional()
  public readonly pagination: boolean = true;

  @ApiProperty({ required: false, default: 1 })
  @IsInt()
  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  @IsOptional()
  public readonly page: number = 1;

  @ApiProperty({ required: false, default: 20 })
  @IsInt()
  @Transform(({ value }) => (value === '' ? undefined : Number(value)))
  @IsOptional()
  public readonly size: number = 20;

  @ApiProperty({ required: false, default: 'updatedAt' })
  @IsString()
  @IsOptional()
  public readonly sort: string = 'updatedAt';

  @ApiProperty({ required: false, enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsEnum(['', 'ASC', 'DESC'])
  @IsOptional()
  public readonly order: 'ASC' | 'DESC' = 'DESC';
}
