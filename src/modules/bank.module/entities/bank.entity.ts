import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { TransactionEntity } from '../../transaction.module/entities';
import { Transaction } from '../../transaction.module/types';
import { Bank } from '../types';

@Entity({ name: 'bank' })
export class BankEntity implements Bank {
  @ApiProperty({ example: '99f29076-b481-4ae6-916d-6cbc4c2fc2a9' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'bank name', example: 'Privat-Bank' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ description: 'balance on bank', example: 500 })
  @Column()
  balance: number;

  @ApiProperty({ example: 'bank number one in Ukraine' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'timestamp', example: new Date() })
  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TransactionEntity, (transactions) => transactions.bank)
  transactions: Transaction[];
}
