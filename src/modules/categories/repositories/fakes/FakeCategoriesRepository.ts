import { v4 as uuid } from "uuid";

import { ICreateCategoryDTO } from "@modules/categories/dtos/ICreateCategoryDTO";
import { Category } from "@modules/categories/infra/prisma/entities/Category";

import { ICategoriesRepository } from "../ICategoriesRepository";

export class FakeCategoriesRepository implements ICategoriesRepository {
  categories: Category[] = [];

  public async create(data: ICreateCategoryDTO): Promise<Category> {
    Object.assign(data, {
      id: uuid()
    });

    this.categories.push(data);

    return data;
  }

  public async findCategoryById(id: string): Promise<Category> {
    const category = this.categories.find(c => c.id === id);

    return category;
  }

  public async findCategoryByName(name: string): Promise<Category> {
    const category = this.categories.find(c => c.name === name);

    return category;
  }

}