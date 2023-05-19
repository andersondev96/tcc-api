import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoryByIdService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(id: string): Promise<Category> {

    let category = await this.cacheProvider.recover<Category>(`category:${id}`);

    if (!category) {
      category = await this.categoryRepository.findCategoryById(id);

      if (!category) {
        throw new AppError("Category not found");
      }

      await this.cacheProvider.save(`category:${id}`, category);
    }

    return category;
  }
}