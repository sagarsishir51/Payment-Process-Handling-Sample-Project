import {BadRequestException, Injectable} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import {PaginationProps} from 'src/common/types/pagination.types';
import {User} from 'src/core/domain/user/user.domain';
import {RoleUseCase} from 'src/core/ports/in/role/role-usecase.port';
import {UserUseCase} from 'src/core/ports/in/user/user-usecase.port';
import {UserRepository} from 'src/core/ports/out/user/user-repository.port';
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
    return await this.transactionRepository.findAllTransactions([options], filter);
  }

  async getTransactionById(transactionId: Transaction['transactionId']): Promise<Transaction> {
    return await this.transactionRepository.findTransaction({ transactionId });
  }

  async createTransaction(data: Transaction): Promise<Transaction> {
    return await this.transactionRepository.createTransaction(data);
  }

  async createBulkTransactions(data: Transaction[]): Promise<Transaction[]> {
    return await this.transactionRepository.createBulkTransactions(data);
  }
  async updateTransactionByIdAndUserId(
    transactionId: Transaction['transactionId'],
    userId: User['userId'],
    data: Partial<Transaction>,
  ): Promise<void> {
  return this.transactionRepository.updateTransaction({transactionId,userId},data)
  }

  async checkTransactionExistsOrFail(
    options: Partial<Transaction>[],
  ): Promise<boolean> {
    return await this.transactionRepository.transactionExists(options);
  }

  async countTransactions(options?: Partial<Transaction>): Promise<number> {
    return await this.transactionRepository.countTransaction(options);
  }

}
