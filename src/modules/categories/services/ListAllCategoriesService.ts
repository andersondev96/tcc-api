import { inject, injectable } from "tsyringe";

import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ListAllCategoriesService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }

  public async execute(): Promise<Category[]> {
    const categories = await this.categoryRepository.listCategories();

    return categories;
  }
}