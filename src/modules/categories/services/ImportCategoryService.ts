import { inject, injectable } from "tsyringe";

import { IXlsxProvider } from "../providers/XlsxProvider/models/IXlsxProvider";
import { ICategoriesRepository } from "../repositories/ICategoriesRepository";
@injectable()
export class ImportCategoryService {

  constructor(
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("XlsxProvider")
    private xlsxProvider: IXlsxProvider
  ) { }


  public async execute(filePath: string): Promise<void> {

    const categories = await this.xlsxProvider.readXlsxProvider(filePath);

    categories.map(async (category) => {
      const { name, description } = category;

      const categoryNotNull = name !== undefined;

      if (categoryNotNull) {
        await this.categoryRepository.create({
          name,
          subcategories: description
        });
      }
    });

  }
}