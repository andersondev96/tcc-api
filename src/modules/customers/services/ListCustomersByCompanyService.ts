import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Customer } from "../infra/prisma/entities/Customer";
import { ICustomersRepository } from "../repositories/ICustomersRepository";


@injectable()
export class ListCustomersByCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository
  ) { }

  public async execute(company_id: string): Promise<Customer[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const customers = await this.customerRepository.findCustomerByCompany(company_id);

    return customers;
  }
}