import {ApiProperty} from '@nestjs/swagger';
import { PAYMENT_PROVIDER, TRANSACTION_STATUS } from '../../../../../common/enums/transaction/transaction.enum';
import { UserResponseDto } from '../user/user.dto';


export class TransactionResponseDto {
  @ApiProperty()
  transactionId: number;

  @ApiProperty({ enum: PAYMENT_PROVIDER })
  status: TRANSACTION_STATUS;

  @ApiProperty({ enum: PAYMENT_PROVIDER })
  paymentProvider: PAYMENT_PROVIDER;

  @ApiProperty()
  remarks: string;

  @ApiProperty()
  paymentProviderId: string;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: Date;

  @ApiProperty({ type: UserResponseDto })
  user: UserResponseDto;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor({
    transactionId,
    paymentProviderId,
    amount,
    status,
    paymentProvider,
    user,
    date,
    createdAt,
    updatedAt,
  }: TransactionResponseDto) {
    Object.assign(this, {
      transactionId,
      paymentProviderId,
      amount,
      status,
      paymentProvider,
      date,
      createdAt,
      updatedAt,
    });

    this.user = new UserResponseDto(user);
  }
}
