import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  company_id: string,
  name?: string,
  category?: string,
  highlight_service?: boolean
}

@injectable()
export class FindServiceByCompanyService {

  constructor(
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository
  ) { }

  public async execute({ company_id, name, category, highlight_service }: IRequest): Promise<Service[]> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company does not exist");
    }

    const services = await this.serviceRepository.listServicesByCompany(
      company_id,
      name,
      category,
      highlight_service
    );

    services.map(service => (
      service.image_url = service.image_url && `${process.env.APP_API_URL}/service/${service.image_url}`
    ));

    return services;
  }
}