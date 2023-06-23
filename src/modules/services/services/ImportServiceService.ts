import { inject, injectable } from "tsyringe";

import { IXlsxProvider } from "@modules/categories/providers/XlsxProvider/models/IXlsxProvider";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Service } from "../infra/prisma/entities/Service";
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

  public async execute(company_id: string, filePath: string): Promise<Service[]> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const services = await this.xlsxProvider.readXlsxProvider(filePath);
    const importedServices: Service[] = [];

    const findCategoryCompany = await this.categoryRepository.findCategoryById(company.category_id);

    if (!findCategoryCompany) {
      throw new AppError("Category not found");
    }

    await Promise.all(services.map(async (service) => {
      const { name, description, price, category } = service;

      if (findCategoryCompany.subcategories.includes(category)) {
        const createdService = await this.serviceRepository.create({
          name,
          description,
          price,
          category,
          company_id
        });
        importedServices.push(createdService);
      } else {
        throw new AppError("Services not found");
      }
    }));


    return importedServices;

  }
}