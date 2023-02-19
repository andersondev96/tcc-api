import { Request, Response } from "express";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListSubcategoriesToCategoriesService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }

  public async execute(category_id: string): Promise<string[]> {

    const category = await this.categoryRepository.findCategoryById(category_id);

    if (!category) {
      throw new AppError("Category not found");
    }

    const subcategories = category.subcategories.split(",");

    return subcategories;

  }
}