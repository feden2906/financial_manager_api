import { ApiProperty } from '@nestjs/swagger';

import { CategoryEntity } from '../entities';

export class ResponseCategoriesDto {
  @ApiProperty({ type: () => [CategoryEntity] })
  categories: CategoryEntity[];
}

export class ResponseCategoryDto {
  @ApiProperty({ type: () => CategoryEntity })
  category: CategoryEntity;
}
