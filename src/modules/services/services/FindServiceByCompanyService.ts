import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { getServiceImageUrl } from "@shared/utils/getFilesUrl";
import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  company_id: string,
  page?: number,
  perPage?: number,
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

  public async execute({
    company_id,
    page, perPage,
    name, category,
    highlight_service
  }: IRequest): Promise<{ services: Service[], totalResults: number }> {

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

    const totalResults = services.length;
    const start = page ? (page - 1) * perPage : 1;
    const end = perPage ? start + perPage : totalResults;
    const servicesByPage = services.slice(start, end);

    services.map(service => (
      service.image_url = getServiceImageUrl(service, "service")
    ));

    return {
      services: servicesByPage,
      totalResults
    };
  }
}