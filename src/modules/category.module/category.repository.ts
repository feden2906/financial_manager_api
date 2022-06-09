import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';

import { CategoryStatisticDto } from '../statistic.module/dto';
import { CategoryMapper } from './category.mapper';
import { CreateCategoryDto } from './dto';
import { CategoryEntity } from './entities';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepository: Repository<CategoryEntity>,
    readonly categoryMapper: CategoryMapper,
  ) {}

  async getCategoryById(
    id: string,
    relations?: string[],
  ): Promise<CategoryEntity> {
    return await this.categoryRepository.findOne({
      relations,
      where: { id },
    });
  }

  async createCategory(
    categoryToSave: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    const newCategory = await this.categoryRepository.save(categoryToSave);
    return newCategory
      ? this.categoryMapper.mapCategoryEntityToCategory(newCategory)
      : null;
  }

  async findAllCategorys(): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find();
    return this.categoryMapper.mapCategoryEntitiesToCategorys(categories);
  }

  async findCategoriesByIds(
    ids: string[],
    relations?: string[],
  ): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      relations,
      where: { id: In(ids) },
    });
    return this.categoryMapper.mapCategoryEntitiesToCategorys(categories);
  }

  async findCategoriesByFilter(
    filterObj: CategoryStatisticDto,
    relations?: string[],
  ): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.find({
      relations,
      where: { id: In(filterObj.categoryIds) },
    });
    return this.categoryMapper.mapCategoryEntitiesToCategorys(categories);
  }

  async updateCategory(id: string, fieldsToUpdate): Promise<CategoryEntity> {
    const categoryEntity = await this.getCategoryById(id);

    Object.assign(categoryEntity, fieldsToUpdate);
    return this.categoryRepository.save(categoryEntity);
  }

  async removeCategory(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
