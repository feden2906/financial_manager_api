import { Injectable } from '@nestjs/common';

import { CostEnum } from '../../common';
import { CategoryService } from '../category.module/category.service';
import { CategoryStatisticDto } from './dto';

@Injectable()
export class StatisticService {
  constructor(private readonly categoryService: CategoryService) {}

  async getStatisticsByCategory(filterDto: CategoryStatisticDto): Promise<any> {
    const info = await this.categoryService.getStatisticsByCategory(filterDto, [
      'transactions',
    ]);

    return info.map((category) => {
      return {
        balance: category.transactions.reduce((a, c) => {
          return c.type === CostEnum.CONSUMABLE ? a - c.amount : a + c.amount;
        }, 0),
        name: category.name,
      };
    });
  }
}
