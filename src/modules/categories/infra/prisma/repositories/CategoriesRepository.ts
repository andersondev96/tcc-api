import { prisma } from "@database/prisma";
import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { generateCategories } from "@shared/utils/generateCategories";

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

  public async createManyCategories(data: ICreateCategoryDTO[]): Promise<Category[]> {
    for (let i = 0; i < 500; i += 50) {
      await prisma.category.findMany({
        where: {
          name: {
            in: data.map(category => category.name)
          }
        }
      });
    }

    const categories = await prisma.category.findMany({
      where: {
        name: {
          in: data.map(category => category.name)
        }
      }
    });

    return categories;
  }

  public async findCategoryById(id: string): Promise<Category> {
    const category = await prisma.category.findUnique({
      where: { id }
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