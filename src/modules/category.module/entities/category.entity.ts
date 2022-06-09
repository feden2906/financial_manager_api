import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TransactionEntity } from '../../transaction.module/entities';
import { Transaction } from '../../transaction.module/types';
import { Category } from '../types';

@Entity({ name: 'categories' })
export class CategoryEntity implements Category {
  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'category name', example: 'Food' })
  @Column()
  name: string;

  @ManyToMany(
    () => TransactionEntity,
    (transactions) => transactions.categories,
  )
  transactions: Transaction[];
}
