import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PaginationProps } from 'src/common/types/pagination.types';
import { User } from 'src/core/domain/user/user.domain';
import { TransactionUseCase } from '../../../ports/in/transaction/transaction-usecase.port';
import { Transaction } from 'src/core/domain/transaction/transaction.domain';
import { TransactionRepository } from '../../../ports/out/transaction/transaction-repository.port';

@Injectable()
export class TransactionCaseImpl implements TransactionUseCase {
  constructor(
    private readonly transactionRepository: TransactionRepository,
  ) {}

  async getAllTransactions(
    options: Partial<Transaction>,
    filter: PaginationProps,
  ): Promise<[Transaction[], number]> {
    return await this.transactionRepository.findAllTransactions(
      [options],
      filter,
    );
  }

  async getTransactionByIdAndUserId(
    transactionId: Transaction['transactionId'],
    userId: User['userId'],
  ): Promise<Transaction> {
    const transaction = Object.assign(new Transaction(), { transactionId,user: Object.assign(new User(),{userId}) });
    return await this.transactionRepository.findTransaction(transaction);
  }

  async createTransaction(data: Transaction): Promise<any> {
    return await this.transactionRepository.createTransaction(data);
  }

  async updateTransactionByIdAndUserId(
    transactionId: Transaction['transactionId'],
    userId: User['userId'],
    transaction: Transaction,
  ): Promise<void> {
    if (!transactionId) {
      throw new Error('Transaction ID must not be null or undefined');
    }
    if (!userId) {
      throw new Error('User ID must not be null or undefined');
    }
    const options = Object.assign(new Transaction(), { transactionId,user: Object.assign(new User(),{userId}) });
    return this.transactionRepository.updateTransaction(
      options,
      transaction,
    );
  }

  async checkTransactionExistsOrFail(
    options: Partial<Transaction>,
  ): Promise<boolean> {
    return await this.transactionRepository.transactionExists(options);
  }

  async countTransactions(options?: Partial<Transaction>): Promise<number> {
    return await this.transactionRepository.countTransaction(options);
  }
}
