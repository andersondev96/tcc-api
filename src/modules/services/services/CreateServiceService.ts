import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { AppError } from "@shared/errors/AppError";

import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";


interface IRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  highlight_service?: boolean;
  company_id: string;
}

@injectable()
export class CreateServiceService {

  constructor(

    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,

    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository,

    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository

  ) { }

  public async execute({
    name,
    description,
    price,
    category,
    highlight_service,
    company_id
  }: IRequest): Promise<Service> {

    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    if (highlight_service) {
      const sevicesByCompany = await this.serviceRepository.listServicesByCompany(company.id);

      const contHighlightsService = sevicesByCompany.reduce((acc, service) => {
        if (service.highlight_service === true) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      const settings = await this.entrepreneurSettingsRepository.findByCompany(company.id);

      if (contHighlightsService >= settings.highlight_services_quantity) {
        throw new AppError(`Maximun services in highlight is ${settings.highlight_services_quantity}`);
      }
    }

    const findCategoryCompany = await this.categoryRepository.findCategoryById(company.category_id);

    const subcategories = findCategoryCompany.subcategories.split(",");

    const subcategoriesWithoutSpaces = subcategories.map(subcategory => subcategory.trim());

    for (let i = 0; i < subcategoriesWithoutSpaces.length; i++) {
      if (subcategoriesWithoutSpaces[i] === category) {
        const service = await this.serviceRepository.create({
          name,
          description,
          price,
          category,
          company_id,
          highlight_service
        });

        return service;
      }
    }

    throw new AppError("Category not found");
  }
}