import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { CategoryPresenter } from './category.presenter';
import { CategoryService } from './category.service';
import {
  CreateCategoryDto,
  ResponseCategoriesDto,
  ResponseCategoryDto,
  UpdateCategoryDto,
} from './dto';

@ApiTags('Category module')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly categoryPresenter: CategoryPresenter,
  ) {}

  @ApiOperation({ summary: 'create new category' })
  @ApiCreatedResponse({ type: ResponseCategoryDto })
  @Post()
  async createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const category = await this.categoryService.createCategory(
      createCategoryDto,
    );
    return this.categoryPresenter.mapCategoryResponse(category);
  }

  @ApiOperation({ summary: 'find many categories' })
  @ApiOkResponse({ type: ResponseCategoriesDto })
  @Get()
  async findAllCategories(): Promise<ResponseCategoriesDto> {
    const categories = await this.categoryService.findAllCategories();
    return this.categoryPresenter.mapMenuCategoryResponse(categories);
  }

  @ApiOperation({ summary: 'find category by id' })
  @ApiOkResponse({ type: ResponseCategoryDto })
  @Get(':categoryId')
  async findOneCategory(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
  ): Promise<ResponseCategoryDto> {
    const category = await this.categoryService.findCategoryById(categoryId);
    return this.categoryPresenter.mapCategoryResponse(category);
  }

  @ApiOperation({ summary: 'update category by id' })
  @ApiCreatedResponse({ type: ResponseCategoryDto })
  @HttpCode(HttpStatus.CREATED)
  @Patch(':categoryId')
  async updateCategory(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ): Promise<ResponseCategoryDto> {
    const category = await this.categoryService.updateCategory(
      categoryId,
      updateCategoryDto,
    );
    return this.categoryPresenter.mapCategoryResponse(category);
  }

  @ApiOperation({ summary: 'delete category by id' })
  @ApiNoContentResponse()
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':categoryId')
  async removeCategory(
    @Param('categoryId', new ParseUUIDPipe()) categoryId: string,
  ): Promise<void> {
    await this.categoryService.removeCategory(categoryId);
  }
}
