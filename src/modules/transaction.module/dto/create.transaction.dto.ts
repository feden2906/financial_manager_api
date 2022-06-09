import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNotEmpty, IsString, IsUUID } from 'class-validator';

import { CostEnum } from '../../../common';
import { Transaction } from '../types';

export class CreateTransactionDto
  implements Pick<Transaction, 'amount' | 'type' | 'bank'>
{
  @ApiProperty({ description: 'transaction`s title', example: 150 })
  @IsNotEmpty()
  @IsInt()
  amount: number;

  @ApiProperty({
    description: 'cost type',
    enum: CostEnum,
    example: 'profitable',
  })
  @IsString()
  @IsEnum(CostEnum)
  type: CostEnum;

  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  @IsUUID()
  bank: string;

  @ApiProperty({ example: ['99f29076-b481-4ae6-916d-6cbc4c2fc2a9'] })
  @IsUUID('all', { each: true })
  categories: string[];
}
