import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional } from 'class-validator';

export class TransactionsFilterDto {
  @ApiProperty({ description: 'count on page', required: false })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  limit?: number;

  @ApiProperty({ description: 'page number', required: false })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @Type(() => Number)
  offset?: number;
}
