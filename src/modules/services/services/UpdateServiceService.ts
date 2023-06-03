import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { AppError } from "@shared/errors/AppError";

import { getServiceImageUrl } from "@shared/utils/getFilesUrl";
import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  highlight_service?: boolean;
}

@injectable()
export class UpdateServiceService {

  constructor(
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository
  ) { }

  public async execute({
    id,
    name,
    description,
    price,
    category,
    highlight_service
  }: IRequest): Promise<Service> {

    const service = await this.serviceRepository.findServiceById(id);

    if (!service) {
      throw new AppError("Service not found");
    }

    if (highlight_service && highlight_service !== service.highlight_service) {
      const sevicesByCompany = await this.serviceRepository.listServicesByCompany(service.company_id);

      const contHighlightsService = sevicesByCompany.reduce((acc, service) => {
        if (service.highlight_service === true) {
          return acc + 1;
        } else {
          return acc;
        }
      }, 0);

      const settings = await this.entrepreneurSettingsRepository.findByCompany(service.company_id);

      if (contHighlightsService >= settings.highlight_services_quantity) {
        throw new AppError(`Maximun services in highlight is ${settings.highlight_services_quantity}`);
      }
    }

    const company = await this.companyRepository.findById(service.company_id);

    const findCategoryCompany = await this.categoryRepository.findCategoryById(company.category_id);

    const subcategories = findCategoryCompany.subcategories.split(",");

    const subcategoriesWithoutSpaces = subcategories.map(subcategory => subcategory.trim());

    for (let i = 0; i < subcategoriesWithoutSpaces.length; i++) {
      if (subcategoriesWithoutSpaces[i] === category) {

        const serviceUpdate = await this.serviceRepository.update({
          id,
          name,
          description,
          price,
          category,
          highlight_service,
          company_id: service.company_id
        });

        return {
          ...serviceUpdate,
          image_url: getServiceImageUrl(service, "service")
        };
      }
    }

    throw new AppError("Category not found");
  }
}