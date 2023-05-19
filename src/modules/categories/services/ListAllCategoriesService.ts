import { inject, injectable } from "tsyringe";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";

import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListAllCategoriesService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) { }

  public async execute(): Promise<Category[]> {
    let categories = await this.cacheProvider.recover<Category[]>("all-categories");

    if (!categories) {
      categories = await this.categoryRepository.listCategories();

      await this.cacheProvider.save("all-categories", categories);
    }

    return categories;
  }
}