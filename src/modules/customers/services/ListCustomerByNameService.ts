import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { CustomerCompany } from "../infra/prisma/entities/CustomerCompany";
import { ICustomersCompaniesRepository } from "../repositories/ICustomersCompaniesRepository";

interface IRequest {
  company_id: string;
  name?: string | null;
}
@injectable()
export class ListCustomerByNameService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CustomersCompaniesRepository")
    private customerCompanyRepository: ICustomersCompaniesRepository
  ) { }

  public async execute({ company_id, name }: IRequest): Promise<CustomerCompany[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    let customers = await this.customerCompanyRepository.findCustomerByCompany(company_id);

    if (name !== undefined) {
      customers = customers.filter(
        (customer_company) => customer_company.customer.user.name === name
      );
    }

    return customers;
  }
}