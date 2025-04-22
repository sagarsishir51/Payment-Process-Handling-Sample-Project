import {ApiProperty, PartialType} from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Min,
} from 'class-validator';
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
  @ApiProperty({enum: TRANSACTION_STATUS,required: false})
  @IsEnum(TRANSACTION_STATUS)
  @IsOptional()
  status?: TRANSACTION_STATUS;

  @ApiProperty({ enum: PAYMENT_PROVIDER })
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
  @Min(1, { message: 'Amount must be greater than 0' })
  amount: number;

  @ApiProperty()
  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  date: Date;
}

export class UpdateTransactionDto {
  @ApiProperty()
  @IsOptional()
  encodedData: string;

  @ApiProperty()
  @IsOptional()
  pidx: string;
}
