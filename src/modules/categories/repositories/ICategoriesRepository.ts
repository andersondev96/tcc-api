import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/prisma/entities/Category";

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;

  createManyCategories(data: ICreateCategoryDTO[]): Promise<Category[]>;

  findCategoryById(id: string): Promise<Category>;

  findCategoryByName(name: string): Promise<Category>;

}