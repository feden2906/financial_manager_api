import { ApiProperty } from '@nestjs/swagger';

export class ResponseCategoryStatisticsDto {
  @ApiProperty({ example: 'Food' })
  name: string;

  @ApiProperty({ example: 8010 })
  balance: number;
}
