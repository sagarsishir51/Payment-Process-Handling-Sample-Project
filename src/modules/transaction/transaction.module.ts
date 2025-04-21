import {Global, Module} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionEntity } from '../../frameworks/secondary/transaction/transaction.entity';
import { TransactionController } from '../../frameworks/primary/controllers/transaction/transaction.controller';
import { UserUseCase } from '../../core/ports/in/user/user-usecase.port';
import { UserUseCaseImpl } from '../../core/application/usecases/user/user.usecase';
import { UserRepository } from '../../core/ports/out/user/user-repository.port';
import { UserRepositoryImpl } from '../../frameworks/secondary/user/user.repository';
import { TransactionUseCase } from '../../core/ports/in/transaction/transaction-usecase.port';
import { TransactionCaseImpl } from '../../core/application/usecases/transaction/transaction.usecase';
import { TransactionRepository } from '../../core/ports/out/transaction/transaction-repository.port';
import { TransactionRepositoryImpl } from '../../frameworks/secondary/transaction/transaction.repository';
import { PaymentModule } from '../payment/payment.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      TransactionEntity
    ]),
    PaymentModule
  ],
  providers: [
    {
      provide: TransactionUseCase,
      useClass: TransactionCaseImpl,
    },
    {
      provide: TransactionRepository,
      useClass: TransactionRepositoryImpl,
    },
  ],
  exports: [],
  controllers:[
    TransactionController
  ]
})
export class TransactionModule {}
