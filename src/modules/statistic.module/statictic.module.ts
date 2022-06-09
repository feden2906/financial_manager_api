import { Module } from '@nestjs/common';

import { CategoryModule } from '../category.module/category.module';
import { StatisticController } from './statistic.controller';
import { StatisticService } from './statistic.service';

@Module({
  controllers: [StatisticController],
  imports: [CategoryModule],
  providers: [StatisticService],
})
export class StatisticModule {}
