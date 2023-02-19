import { inject, injectable } from "tsyringe";

import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoryByNameService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }

  public async execute(name: string): Promise<Category> {

    const category = await this.categoryRepository.findCategoryByName(name);

    if (category) {
      return category;
    }
  }
}