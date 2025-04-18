import {Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query,} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ResponseDto,} from '../../dto/response/response.dto';
import {User} from 'src/core/domain/user/user.domain';
import {Privileges} from '../../decorators/privilege.decorator';
import {PRIVILEGE_SUBNAME} from 'src/common/enums/privilege/privilege.enum';
import {Transactional} from "typeorm-transactional";
import { TransactionUseCase } from '../../../../core/ports/in/transaction/transaction-usecase.port';
import {
  CreateTransactionDto,
  QueryTransactionDto,
  UpdateTransactionDto,
} from '../../dto/request/transaction/transaction.dto';
import { TransactionResponseDto } from '../../dto/response/transaction/transcation.dto';
import { Transaction } from '../../../../core/domain/transaction/transaction.domain';
import { AuthUser } from '../../decorators/user.decorator';

@ApiBearerAuth()
@ApiTags('/transaction')
@Controller('/transaction')
export class TransactionController {
  constructor(private readonly transactionUseCase: TransactionUseCase) {}

  @Get()
  @ApiOperation({ summary: 'Get all transactions' })
  async findAll(@Query() queryTransactionDto: QueryTransactionDto) {
    const { page, size, status,paymentProvider } = queryTransactionDto;

    const [transactions, count] = await this.transactionUseCase.getAllTransactions(
      { status,paymentProvider },
      queryTransactionDto,
    );

    const data = transactions.map((transaction) => new TransactionResponseDto(transaction));

    return new ResponseDto('Transactions Fetched', data, {
      count,
      page,
      size,
    });
  }

  @Get(':transactionId')
  @ApiOperation({ summary: 'Get transaction by id' })
  async findOne(@Param('transactionId', ParseUUIDPipe) transactionId: number) {
    return new ResponseDto(
      'Transaction Fetched',
      new TransactionResponseDto(await this.transactionUseCase.getTransactionById(transactionId)),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create transaction' })
  @Privileges(PRIVILEGE_SUBNAME.TRANSACTION)
  @Transactional()
  async create(@AuthUser() user: User,@Body() createTransactionDto: CreateTransactionDto) {
    await this.transactionUseCase.createTransaction(Transaction.create({ ...createTransactionDto, user }));
    return new ResponseDto('Transaction Created');
  }

  @Patch(':transactionId')
  @ApiOperation({ summary: 'Update Transaction' })
  @Privileges(PRIVILEGE_SUBNAME.TRANSACTION)
  @Transactional()
  async update(
    @AuthUser() user: User,
    @Param('transactionId', ParseUUIDPipe) transactionId: number,
    @Body() updateTransactionDto: UpdateTransactionDto,
  ) {
    await this.transactionUseCase.updateTransactionByIdAndUserId(transactionId,user?.userId, { ...updateTransactionDto });
    return new ResponseDto('Transaction Updated');
  }
}
