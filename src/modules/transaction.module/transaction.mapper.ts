import { ResponseTransactionsDto } from './dto';
import { TransactionEntity } from './entities';

export class TransactionMapper {
  mapTransactionEntityToTransaction(transaction: TransactionEntity) {
    return { ...transaction };
  }

  mapTransactionEntitiesToTransactions(
    transactions: TransactionEntity[],
    transactionsCount: number,
  ): ResponseTransactionsDto {
    return {
      transactions: transactions.map((transaction) =>
        this.mapTransactionEntityToTransaction(transaction),
      ),
      transactionsCount,
    };
  }
}
