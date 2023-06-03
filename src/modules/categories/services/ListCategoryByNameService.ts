import { inject, injectable } from "tsyringe";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoryByNameService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(name: string): Promise<Category> {

    let category = await this.cacheProvider.recover<Category>(`category-name:${name}`);

    if (!category) {
      category = await this.categoryRepository.findCategoryByName(name);
    }

    return category;
  }
}