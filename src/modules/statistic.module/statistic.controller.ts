import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';

import { CategoryStatisticDto, ResponseCategoryStatisticsDto } from './dto';
import { StatisticService } from './statistic.service';

@ApiTags('Statistic module')
@Controller('statistics')
export class StatisticController {
  constructor(private readonly statisticsService: StatisticService) {}

  @ApiOperation({ summary: 'get statistics by category ids' })
  @ApiOkResponse({ type: [ResponseCategoryStatisticsDto] })
  @Post('categories') // TODO -> change to Get
  async findAllStatistics(
    @Body() filterDto: CategoryStatisticDto,
  ): Promise<any> {
    return await this.statisticsService.getStatisticsByCategory(filterDto);
  }
}
