import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { CostEnum } from '../../../common';
import { BankEntity } from '../../bank.module/entities';
import { Bank } from '../../bank.module/types';
import { CategoryEntity } from '../../category.module/entities';
import { Category } from '../../category.module/types';
import { Transaction } from '../types';

@Entity({ name: 'transactions' })
export class TransactionEntity implements Transaction {
  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'transaction`s title', example: 150 })
  @Column()
  amount: number;

  @ApiProperty({
    description: 'cost type',
    enum: CostEnum,
    example: 'profitable',
  })
  @Column()
  type: CostEnum;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  @ManyToOne(() => BankEntity, (bank) => bank.transactions, {
    nullable: false,
  })
  bank: Bank;

  @ManyToMany(() => CategoryEntity, (category) => category.transactions, {
    nullable: false,
  })
  @JoinTable()
  categories: Category[];
}
