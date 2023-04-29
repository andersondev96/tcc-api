import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { CustomerCompany } from "../infra/prisma/entities/CustomerCompany";
import { ICustomersCompaniesRepository } from "../repositories/ICustomersCompaniesRepository";

interface IResponse {
  company_id: string;
  page: number;
  perPage: number;
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

  public async execute({ company_id, page, perPage, name, email }: IResponse): Promise<{ customers: CustomerCompany[], totalResults: number }> {
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

    const totalResults = customersByCompany.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const customersByPage = customersByCompany.slice(start, end);



    const customersWithUserAvatar = customersByPage.map((customerCompany) => {
      return {
        ...customerCompany,
        customer: {
          ...customerCompany.customer,
          user: {
            ...customerCompany.customer.user,
            avatar: customerCompany.customer.user.avatar
              ? `${process.env.APP_API_URL}/avatar/${customerCompany.customer.user.avatar}`
              : undefined
          }
        }
      }
    });

    return {
      customers: customersWithUserAvatar,
      totalResults,
    };
  }
}