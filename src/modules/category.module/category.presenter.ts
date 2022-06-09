import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoryPresenter {
  mapCategoryResponse(category) {
    return { category };
  }

  mapMenuCategoryResponse(categories) {
    return { categories };
  }
}
