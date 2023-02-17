import { inject, injectable } from "tsyringe";

import { readXlsxFile } from "@shared/utils/readXlsxFile";

import { Category } from "../infra/prisma/entities/Category";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";

@injectable()
export class ImportCategoryService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository
  ) { }


  public async execute(filePath: string): Promise<void> {

    const categories = readXlsxFile(filePath);

    categories.map(async (category) => {
      const { name } = category;

      const categoryNotNull = name !== undefined;

      if (categoryNotNull) {
        await this.categoryRepository.create({
          name
        });
      }
    });

  }
}