import { PAYMENT_PROVIDER, TRANSACTION_STATUS } from '../../../common/enums/transaction/transaction.enum';
import { User } from '../user/user.domain';

export type CreateTransactionProps = {

  status?: TRANSACTION_STATUS;
  paymentProvider: PAYMENT_PROVIDER;
  remarks?: string;
  paymentProviderId?: string;
  amount: number;
  date: Date;
  user: User;
};

export type UpdateTransactionProps = Partial<CreateTransactionProps>;
