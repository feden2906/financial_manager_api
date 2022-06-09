import { CostEnum } from '../../../common';
import { Bank } from '../../bank.module/types';
import { Category } from '../../category.module/types';

export type Transaction = {
  id: string;
  amount: number;
  type: CostEnum;
  createdAt: Date;
  updatedAt: Date;
  bank: Bank['id'] | Bank;
  categories: Category[];
};
