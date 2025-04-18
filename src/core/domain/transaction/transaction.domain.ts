import {z} from 'zod';
import {plainToInstance, Type} from 'class-transformer';
import { CreateTransactionProps, UpdateTransactionProps } from './transaction.types';
import { PAYMENT_PROVIDER, TRANSACTION_STATUS } from '../../../common/enums/transaction/transaction.enum';
import { User } from '../user/user.domain';

export class Transaction {
  transactionId: number;
  status: TRANSACTION_STATUS;
  paymentProvider: PAYMENT_PROVIDER;
  remarks: string;
  paymentProviderId: string;
  amount: number;
  date: Date;
  @Type(() => User)
  user: User;
  createdAt: Date;
  updatedAt: Date;

  static readonly #validator = z.object({
    status: z.nativeEnum(TRANSACTION_STATUS).default(TRANSACTION_STATUS.INITIATED),
    paymentProvider: z.nativeEnum(PAYMENT_PROVIDER),
    remarks: z.string().nullish(),
    paymentProviderId: z.string().nullish(),
    amount: z.number(),
    date: z.date().default(new Date()),
    User: z.intersection(z.instanceof(User), z.object({ userId: z.number() })),
  });

  static create(createTransactionProps: CreateTransactionProps) {
    return plainToInstance(Transaction, this.#validator.parse(createTransactionProps), {
      exposeUnsetFields: false,
    });
  }

  static update(updateTransactionProps: UpdateTransactionProps) {
    return plainToInstance(
      Transaction,
      this.#validator.partial().parse(updateTransactionProps),
      { exposeUnsetFields: false },
    );
  }

  static toDomain(transaction: Transaction) {
    return plainToInstance(Transaction, transaction, {
      exposeUnsetFields: false,
      enableImplicitConversion: true,
    });
  }

  static toDomains(transactions: Transaction[]) {
    return transactions?.map(this.toDomain);
  }
}
