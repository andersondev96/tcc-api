import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class CreateCategoryService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(name: string, subcategories?: string): Promise<Category> {

    const categoryExists = await this.categoryRepository.findCategoryByName(name);

    if (categoryExists) {
      throw new AppError("Category already exists");
    }

    const category = await this.categoryRepository.create({
      name,
      subcategories
    });

    await this.cacheProvider.invalidate('all-categories');

    return category;
  }
}