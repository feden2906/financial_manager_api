import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

import { CategoryStatisticDto } from '../statistic.module/dto';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { CategoryEntity } from './entities';

@Injectable()
export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}
  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryRepository.createCategory(createCategoryDto);
  }

  async findAllCategories(): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findAllCategorys();
  }

  async getStatisticsByCategory(
    filterObj: CategoryStatisticDto,
    relations?: string[],
  ): Promise<CategoryEntity[]> {
    return await this.categoryRepository.findCategoriesByFilter(
      filterObj,
      relations,
    );
  }

  async findCategoryById(
    id: string,
    relations?: string[],
  ): Promise<CategoryEntity> {
    const category = await this.categoryRepository.getCategoryById(
      id,
      relations,
    );
    if (!category) {
      throw new BadRequestException(`Category with ID ${id} not found`);
    }
    return category;
  }

  async findCategoriesByIds(categoryIds: string[]): Promise<CategoryEntity[]> {
    const categories = await this.categoryRepository.findCategoriesByIds(
      categoryIds,
    );
    if (categoryIds.length > categories.length) {
      throw new HttpException(
        'Some category don`t exist',
        HttpStatus.BAD_REQUEST,
      );
    }
    return categories;
  }

  async updateCategory(
    categoryId: string,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<CategoryEntity> {
    return await this.categoryRepository.updateCategory(
      categoryId,
      updateCategoryDto,
    );
  }

  async removeCategory(id: string): Promise<void> {
    const category = await this.findCategoryById(id, ['transactions']);

    if (category.transactions.length) {
      throw new BadRequestException(`Bank with ID ${id} has transactions`);
    }
    return await this.categoryRepository.removeCategory(id);
  }
}
