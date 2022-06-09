import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Helper, Include } from '../../common';
import { CategoryEntity } from '../category.module/entities';
import {
  CreateTransactionDto,
  ResponseTransactionsDto,
  TransactionsFilterDto,
} from './dto';
import { TransactionEntity } from './entities';
import { TransactionMapper } from './transaction.mapper';

@Injectable()
export class TransactionRepository {
  constructor(
    @InjectRepository(TransactionEntity)
    private readonly transactionRepository: Repository<TransactionEntity>,
    readonly transactionMapper: TransactionMapper,
  ) {}

  async createTransaction(
    dto: CreateTransactionDto,
    categories: CategoryEntity[],
  ): Promise<TransactionEntity> {
    const newEntity = Object.assign(new TransactionEntity(), dto, {
      categories,
    });
    const newTransaction = await this.transactionRepository.save(newEntity);
    return newTransaction
      ? this.transactionMapper.mapTransactionEntityToTransaction(newTransaction)
      : null;
  }

  async findAllTransactions(
    filterDto: TransactionsFilterDto,
    joins: Include[],
  ): Promise<ResponseTransactionsDto> {
    const { offset, limit } = filterDto;
    const queryBuilder =
      this.transactionRepository.createQueryBuilder('transaction');

    Helper.joinTables(queryBuilder, joins);

    queryBuilder.orderBy('transaction.createdAt', 'DESC');
    const transactionsCount = await queryBuilder.getCount();

    if (limit) queryBuilder.limit(limit);
    if (offset) queryBuilder.offset(offset);

    const transactions = await queryBuilder.getMany();
    return this.transactionMapper.mapTransactionEntitiesToTransactions(
      transactions,
      transactionsCount,
    );
  }

  async removeTransaction(transactionId: string): Promise<void> {
    await this.transactionRepository.delete(transactionId);
  }
}
