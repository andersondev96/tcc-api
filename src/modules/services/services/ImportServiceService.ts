import { inject, injectable } from "tsyringe";

import { IXlsxProvider } from "@modules/categories/providers/XlsxProvider/models/IXlsxProvider";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { IServicesRepository } from "../repositories/IServicesRepository";

@injectable()
export class ImportServiceService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,

    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("XlsxProvider")
    private xlsxProvider: IXlsxProvider
  ) { }

  public async execute(company_id: string, filePath: string): Promise<void> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const services = await this.xlsxProvider.readXlsxProvider(filePath);

    const findCategoryCompany = await this.categoryRepository.findCategoryById(company.category_id);

    services.map(async (service) => {
      const { name, description, price, category } = service;

      if (findCategoryCompany.subcategories.includes(category)) {
        await this.serviceRepository.create({
          name,
          description,
          price,
          category: findCategoryCompany.id,
          company_id
        });
      }
    });

  }
}