import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListCategoryByIdService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }

  public async execute(id: string): Promise<Category> {

    const category = await this.categoryRepository.findCategoryById(id);

    if (!category) {
      throw new AppError("Category not found");
    }

    return category;
  }
}