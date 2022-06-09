import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BankModule } from '../bank.module/bank.module';
import { CategoryModule } from '../category.module/category.module';
import { TransactionEntity } from './entities';
import { TransactionController } from './transaction.controller';
import { TransactionMapper } from './transaction.mapper';
import { TransactionPresenter } from './transaction.presenter';
import { TransactionRepository } from './transaction.repository';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  imports: [
    BankModule,
    CategoryModule,
    TypeOrmModule.forFeature([TransactionEntity]),
  ],
  providers: [
    TransactionService,
    TransactionRepository,
    TransactionPresenter,
    TransactionMapper,
  ],
})
export class TransactionModule {}
