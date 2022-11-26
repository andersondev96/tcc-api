import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";


interface IRequest {
  name: string;
  description: string;
  price: number;
  category: string;
  company_id: string;
}

@injectable()
export class CreateServiceService {

  constructor(
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,

    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository

  ) { }

  public async execute({
    name,
    description,
    price,
    category,
    company_id
  }: IRequest): Promise<Service> {

    const company = await this.companiesRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const service = await this.serviceRepository.create({
      name,
      description,
      price,
      category,
      company_id
    });

    return service;

  }
}