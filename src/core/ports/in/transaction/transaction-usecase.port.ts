import {PaginationProps} from 'src/common/types/pagination.types';
import { Transaction } from '../../../domain/transaction/transaction.domain';
import { User } from '../../../domain/user/user.domain';

export abstract class TransactionUseCase {
  abstract getAllTransactions(
    options: Partial<Transaction>,
    filter: PaginationProps,
  ): Promise<[Transaction[], number]>;
  abstract getTransactionByIdAndUserId(id: Transaction['transactionId'],userId: User['userId']): Promise<Transaction>;
  abstract createTransaction(data: Transaction): Promise<Transaction>;
  abstract updateTransactionByIdAndUserId(
    transactionId: Transaction['transactionId'],
    userId: User['userId'],
    data: Transaction,
  ): Promise<void>;
}
