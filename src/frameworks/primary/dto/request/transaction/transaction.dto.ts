import {ApiProperty, PartialType} from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import {QueryDto} from '../query.dto';
import {USER_STATUS} from 'src/common/enums/user/user.enum';
import { PAYMENT_PROVIDER, TRANSACTION_STATUS } from '../../../../../common/enums/transaction/transaction.enum';
import { User } from '../../../../../core/domain/user/user.domain';

export class QueryTransactionDto extends QueryDto {
  @ApiProperty({ required: false, enum: TRANSACTION_STATUS })
  @IsEnum(TRANSACTION_STATUS)
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  status?: TRANSACTION_STATUS;

  @ApiProperty({ required: false, enum: PAYMENT_PROVIDER })
  @IsEnum(PAYMENT_PROVIDER)
  @Transform(({ value }) => (value === '' ? undefined : value))
  @IsOptional()
  paymentProvider?: PAYMENT_PROVIDER;
}

export class CreateTransactionDto {
  @ApiProperty()
  @IsEnum(TRANSACTION_STATUS)
  @IsOptional()
  status?: TRANSACTION_STATUS;

  @ApiProperty()
  @IsEnum(PAYMENT_PROVIDER)
  paymentProvider: PAYMENT_PROVIDER;

  @ApiProperty({required:false})
  @IsOptional()
  remarks: string;

  @ApiProperty({required:false})
  @IsString()
  @IsOptional()
  paymentProviderId: string;

  @ApiProperty()
  @IsNotEmpty()
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  date: Date;
}

export class UpdateTransactionDto extends PartialType(CreateTransactionDto) {
}
