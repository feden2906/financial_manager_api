import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CategoryController } from './category.controller';
import { CategoryMapper } from './category.mapper';
import { CategoryPresenter } from './category.presenter';
import { CategoryRepository } from './category.repository';
import { CategoryService } from './category.service';
import { CategoryEntity } from './entities';

@Module({
  controllers: [CategoryController],
  exports: [CategoryService],
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [
    CategoryService,
    CategoryRepository,
    CategoryPresenter,
    CategoryMapper,
  ],
})
export class CategoryModule {}
