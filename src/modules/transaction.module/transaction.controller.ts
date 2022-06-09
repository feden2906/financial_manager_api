import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import {
  CreateTransactionDto,
  ResponseTransactionDto,
  ResponseTransactionsDto,
  TransactionsFilterDto,
} from './dto';
import { TransactionPresenter } from './transaction.presenter';
import { TransactionService } from './transaction.service';

@ApiTags('Transaction module')
@Controller('transaction')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly transactionPresenter: TransactionPresenter,
  ) {}

  @ApiOperation({ summary: 'create new transaction' })
  @ApiCreatedResponse({ type: ResponseTransactionDto })
  @Post()
  async createTransaction(
    @Body() dto: CreateTransactionDto,
  ): Promise<ResponseTransactionDto> {
    const transaction = await this.transactionService.createTransaction(dto);
    return this.transactionPresenter.mapTransactionResponse(transaction);
  }

  @ApiOperation({ summary: 'find many transactions' })
  @ApiOkResponse({ type: ResponseTransactionsDto })
  @Get()
  async findAllTransactions(
    @Query() filterDto: TransactionsFilterDto,
  ): Promise<ResponseTransactionsDto> {
    return await this.transactionService.findAllTransactions(filterDto);
  }

  @ApiOperation({ summary: 'delete transaction by id' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':transactionId')
  async removeTransaction(
    @Param('transactionId', new ParseUUIDPipe()) transactionId: string,
  ): Promise<void> {
    await this.transactionService.removeTransaction(transactionId);
  }
}
