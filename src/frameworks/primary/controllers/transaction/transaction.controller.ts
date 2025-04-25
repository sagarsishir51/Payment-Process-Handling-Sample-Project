import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '../../dto/response/response.dto';
import { User } from 'src/core/domain/user/user.domain';
import { Privileges } from '../../decorators/privilege.decorator';
import { PRIVILEGE_SUBNAME } from 'src/common/enums/privilege/privilege.enum';
import { Transactional } from 'typeorm-transactional';
import { TransactionUseCase } from '../../../../core/ports/in/transaction/transaction-usecase.port';
import {
  CreateTransactionDto,
  QueryTransactionDto,
  UpdateTransactionDto,
} from '../../dto/request/transaction/transaction.dto';
import { TransactionResponseDto } from '../../dto/response/transaction/transcation.dto';
import { Transaction } from '../../../../core/domain/transaction/transaction.domain';
import { AuthUser } from '../../decorators/user.decorator';
import { PaymentFactory } from '../../../../infrastructure/payment/payment.factory';
import { Payment } from '../../../../core/domain/payment/payment.domain';
import { TRANSACTION_STATUS } from '../../../../common/enums/transaction/transaction.enum';

@ApiBearerAuth()
@ApiTags('/transaction')
@Controller('/transaction')
export class TransactionController {
  constructor(
    private readonly transactionUseCase: TransactionUseCase,
    private readonly paymentFactory: PaymentFactory,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  async findAll(@Query() queryTransactionDto: QueryTransactionDto) {
    const { page, size, status, paymentProvider } = queryTransactionDto;

    const [transactions, count] =
      await this.transactionUseCase.getAllTransactions(
        { status, paymentProvider },
        queryTransactionDto,
      );

    const data = transactions.map(
      (transaction) => new TransactionResponseDto(transaction),
    );

    return new ResponseDto('Transactions Fetched', data, {
      count,
      page,
      size,
    });
  }

  @Get(':transactionId')
  @ApiOperation({ summary: 'Get transaction by id' })
  async findOne(@Param('transactionId', ParseIntPipe) transactionId: number,
                @AuthUser() user: User,) {
    return new ResponseDto(
      'Transaction Fetched',
      new TransactionResponseDto(
        await this.transactionUseCase.getTransactionByIdAndUserId(transactionId,user?.userId),
      ),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @Privileges(PRIVILEGE_SUBNAME.TRANSACTION)
  @Transactional()
  async create(
    @AuthUser() user: User,
    @Body() createTransactionDto: CreateTransactionDto,
  ) {
    const transaction = await this.transactionUseCase.createTransaction(
      Transaction.create({ ...createTransactionDto, user }),
    );
    const paymentData = await this.paymentFactory
      .create(transaction?.paymentProvider)
      .initPayment(
        Payment.create({
          amount: transaction?.amount,
          transactionId: 'TEST_ID' + String(transaction?.transactionId),
        //TEST_ID string is attached for making transactionId unique in test system; remove in live system
      }),
      );
    return {
      paymentProvider: transaction?.paymentProvider,
      paymentData,
    };
  }

  @Patch(':transactionId')
  @ApiOperation({ summary: 'Update Transaction' })
  @Privileges(PRIVILEGE_SUBNAME.TRANSACTION)
  @Transactional()
  async update(
    @AuthUser() user: User,
    @Param('transactionId', ParseIntPipe) transactionId: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    const transaction = await this.transactionUseCase.getTransactionByIdAndUserId(transactionId,user?.userId);
    if (!transaction) {
      throw new NotFoundException("Transaction not found");
    }
      const paymentData = await this.paymentFactory
        .create(transaction?.paymentProvider)
        ?.verify(updateTransactionDto);
    if(transaction?.amount !== paymentData?.totalAmount){
      throw new NotFoundException("Transaction amount miss match case. Please contact admin");
    }
      transaction.status = TRANSACTION_STATUS.SUCCESS;
      transaction.paymentProviderId = paymentData?.paymentProviderId;
      await this.transactionUseCase.updateTransactionByIdAndUserId(
        transactionId,
        user?.userId,
        transaction,
      );
    return new ResponseDto('Transactions updated');
    }
}
