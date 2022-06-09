import { CategoryEntity } from './entities';

export class CategoryMapper {
  mapCategoryEntityToCategory(category: CategoryEntity) {
    return { ...category };
  }

  mapCategoryEntitiesToCategorys(categories: CategoryEntity[]) {
    return categories.map((category) =>
      this.mapCategoryEntityToCategory(category),
    );
  }
}
