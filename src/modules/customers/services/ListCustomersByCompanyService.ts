import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { CustomerCompany } from "../infra/prisma/entities/CustomerCompany";
import { ICustomersCompaniesRepository } from "../repositories/ICustomersCompaniesRepository";

interface IResponse {
  company_id: string;
  name?: string;
  email?: string;
}
@injectable()
export class ListCustomersByCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CustomersCompaniesRepository")
    private customerCompanyRepository: ICustomersCompaniesRepository
  ) { }

  public async execute({ company_id, name, email }: IResponse): Promise<CustomerCompany[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    let customersByCompany = await this.customerCompanyRepository.findCustomerByCompany(company_id);

    if (name || email) {
      customersByCompany = customersByCompany.filter(cs =>
        cs.customer.user.name.includes(name) ||
        cs.customer.user.email.includes(email)
      );
    }

    return customersByCompany;
  }
}