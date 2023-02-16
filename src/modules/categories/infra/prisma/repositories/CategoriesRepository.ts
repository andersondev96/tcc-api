import { prisma } from "@database/prisma";
import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";

import { Category } from "../entities/Category";

export class CategoriesRepository implements ICategoriesRepository {

  public async create({ id, name }: ICreateCategoryDTO): Promise<Category> {
    const category = await prisma.category.create({
      data: {
        id,
        name
      }
    });

    return category;
  }

  public async findCategoryByName(name: string): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { name }
    });

    return category;
  }

}