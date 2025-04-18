import {Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post, Query,} from '@nestjs/common';
import {ApiBearerAuth, ApiOperation, ApiTags} from '@nestjs/swagger';
import {ApiCustomResponse, ApiPaginatedResponse, ResponseDto,} from '../../dto/response/response.dto';
import {UserResponseDto} from '../../dto/response/user/user.dto';
import {CreateUserDto, QueryUserDto, UpdateUserDto,} from '../../dto/request/user/user.dto';
import {UserUseCase} from 'src/core/ports/in/user/user-usecase.port';
import {User} from 'src/core/domain/user/user.domain';
import {Role} from 'src/core/domain/role/role.domain';
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
  @ApiPaginatedResponse(UserResponseDto)
  async findAll(@Query() queryTransactionDto: QueryTransactionDto) {
    const { page, size, status,paymentProvider } = queryTransactionDto;

    const [users, count] = await this.transactionUseCase.getAllTransactions(
      { status,paymentProvider },
      queryTransactionDto,
    );

    const data = users.map((user) => new TransactionResponseDto(user));

    return new ResponseDto('Transactions Fetched', data, {
      count,
      page,
      size,
    });
  }

  @Get(':transactionId')
  @ApiOperation({ summary: 'Get transaction by id' })
  @ApiCustomResponse(UserResponseDto)
  async findOne(@Param('transactionId', ParseUUIDPipe) transactionId: number) {
    return new ResponseDto(
      'User Fetched',
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
    return new ResponseDto('User Updated');
  }
}
