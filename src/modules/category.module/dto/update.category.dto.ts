import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, MinLength } from 'class-validator';

import { Category } from '../types';

export class UpdateCategoryDto implements Pick<Category, 'name'> {
  @ApiProperty({ description: 'category name', example: 'Food' })
  @MinLength(2)
  @MaxLength(32)
  @IsNotEmpty()
  @IsOptional()
  name: string;
}
