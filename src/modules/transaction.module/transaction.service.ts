import { BadRequestException, Injectable } from '@nestjs/common';

import { CostEnum } from '../../common';
import { BankService } from '../bank.module/bank.service';
import { CategoryService } from '../category.module/category.service';
import {
  CreateTransactionDto,
  ResponseTransactionsDto,
  TransactionsFilterDto,
} from './dto';
import { TransactionEntity } from './entities';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  constructor(
    private readonly transactionRepository: TransactionRepository,
    private readonly bankService: BankService,
    private readonly categoryService: CategoryService,
  ) {}

  async createTransaction(
    dto: CreateTransactionDto,
  ): Promise<TransactionEntity> {
    const bankEntity = await this.bankService.findBankById(dto.bank);

    const categories = await this.categoryService.findCategoriesByIds(
      dto.categories,
    );

    if (dto.type === CostEnum.CONSUMABLE) {
      const newBalance = bankEntity.balance - dto.amount;
      if (newBalance < 0) {
        throw new BadRequestException('Not enough money in the account');
      }
      bankEntity.balance = newBalance;
    } else {
      bankEntity.balance += dto.amount;
    }

    await this.bankService.updateBank(bankEntity);

    return await this.transactionRepository.createTransaction(dto, categories);
  }

  async findAllTransactions(
    filterDto: TransactionsFilterDto,
  ): Promise<ResponseTransactionsDto> {
    return await this.transactionRepository.findAllTransactions(filterDto, [
      { alias: 'categories', property: 'transaction.categories' },
    ]);
  }

  async removeTransaction(transactionId: string): Promise<void> {
    await this.transactionRepository.removeTransaction(transactionId);
  }
}
