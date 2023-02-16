import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../infra/prisma/entities/Category";

export interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<Category>;

  findCategoryByName(name: string): Promise<Category>;

}