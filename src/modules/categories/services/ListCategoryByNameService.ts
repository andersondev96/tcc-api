import { injectAll, injectable } from "tsyringe";

import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoryByNameService {

  constructor(
    @injectAll("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }

  public async execute(name: string): Promise<Category> {
    const category = await this.categoryRepository.findCategoryByName(name);

    return category;
  }
}