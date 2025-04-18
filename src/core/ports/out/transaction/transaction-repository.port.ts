import {PaginationProps} from 'src/common/types/pagination.types';
import { Transaction } from '../../../domain/transaction/transaction.domain';

export abstract class TransactionRepository {
  abstract findAllTransactions(
    options: Partial<Transaction>[],
    filter: PaginationProps,
  ): Promise<[Transaction[], number]>;
  abstract findTransaction(options: Partial<Transaction>): Promise<Transaction>;
  abstract createTransaction(data: Transaction): Promise<Transaction>;
  abstract createBulkTransactions(data: Transaction[]): Promise<Transaction[]>;
  abstract updateTransaction(
    options: Pick<Transaction, 'transactionId'>,
    data: Partial<Transaction>,
  ): Promise<void>;
  abstract countTransaction(options: Partial<Transaction>): Promise<number>;
  abstract transactionExists(options: Partial<Transaction>[]): Promise<boolean>;
}
