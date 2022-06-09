import { ApiProperty } from '@nestjs/swagger';

import { TransactionEntity } from '../entities';

export class ResponseTransactionsDto {
  @ApiProperty({ type: () => [TransactionEntity] })
  transactions: TransactionEntity[];

  @ApiProperty({ description: 'all count', example: 70 })
  transactionsCount: number;
}

export class ResponseTransactionDto {
  @ApiProperty({ type: () => TransactionEntity })
  transaction: TransactionEntity;
}
