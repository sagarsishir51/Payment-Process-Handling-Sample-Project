import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {FindOptionsWhere, ILike, Repository} from 'typeorm';
import {PaginationProps} from 'src/common/types/pagination.types';
import {getPaginationSortParams} from 'src/utils/util.index';
import { TransactionRepository } from '../../../core/ports/out/transaction/transaction-repository.port';
import { TransactionEntity } from './transaction.entity';
import { Transaction } from 'src/core/domain/transaction/transaction.domain';

@Injectable()
export class TransactionRepositoryImpl implements TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
  ) {}

  async findAllTransactions(
    options: Partial<Transaction>[],
    filter: PaginationProps,
  ): Promise<[Transaction[], number]> {
    const baseCondition = (options: Partial<Transaction>) => [
      { userName: ILike(`%${filter?.search || ''}%`), ...options },
      { email: ILike(`%${filter?.search || ''}%`), ...options },
      { phone: ILike(`%${filter?.search || ''}%`), ...options },
    ];

    const condition: FindOptionsWhere<Transaction>[] = options?.flatMap((opt) =>
      baseCondition(opt),
    );

    const transactions = await this.transactionRepository.find({
      where: condition,
      relations: {
        user: true,
      },
      ...getPaginationSortParams(filter),
    });

    const count = await this.transactionRepository.count({ where: condition });

    return [Transaction.toDomains(transactions), count] as [Transaction[], number];
  }

  async findTransaction(options: Partial<Transaction>): Promise<Transaction> {
    return Transaction.toDomain(
      await this.transactionRepository.findOneOrFail({
        where: options,
        relations: {
          user: true,
        },
      }),
    );
  }

  async createTransaction(data: Transaction): Promise<Transaction> {
    return Transaction.toDomain(
      await this.transactionRepository.save(
        this.transactionRepository.create(data),
      ),
    );
  }

  async createBulkTransactions(data: Transaction[]): Promise<Transaction[]> {
    return Transaction.toDomains(
      await this.transactionRepository.save(
        this.transactionRepository.create(data),
      ),
    );
  }

  async updateTransaction(
    options: { transactionId: number; userId: string },
    data: Partial<Transaction>,
  ): Promise<void> {
    await this.transactionRepository.update({transactionId:options?.transactionId,user:{userId:options?.userId}}, data);
  }

  async transactionExists(options: Partial<Transaction>[]): Promise<boolean> {
    return await this.transactionRepository.existsBy(options);
  }

  async countTransaction(options: Partial<Transaction>): Promise<number> {
    return await this.transactionRepository.countBy(options);
  }
}
