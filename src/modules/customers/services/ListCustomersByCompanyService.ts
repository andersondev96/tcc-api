import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { CustomerCompany } from "../infra/prisma/entities/CustomerCompany";
import { ICustomersCompaniesRepository } from "../repositories/ICustomersCompaniesRepository";

@injectable()
export class ListCustomersByCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CustomersCompaniesRepository")
    private customerCompanyRepository: ICustomersCompaniesRepository
  ) { }

  public async execute(company_id: string): Promise<CustomerCompany[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const customers = await this.customerCompanyRepository.findCustomerByCompany(company_id);

    return customers;
  }
}