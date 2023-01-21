import { v4 as uuid } from "uuid";

import { ICreateCustomerCompanyDTO } from "@modules/customers/dtos/ICreateCustomerCompanyDTO";
import { CustomerCompany } from "@modules/customers/infra/prisma/entities/CustomerCompany";

import { ICustomersCompaniesRepository } from "../ICustomersCompaniesRepository";

export class FakeCustomersCompaniesRepository implements ICustomersCompaniesRepository {

  customersCompanies: CustomerCompany[] = [];

  public async create(data: ICreateCustomerCompanyDTO): Promise<CustomerCompany> {
    Object.assign(data, {
      id: uuid()
    });

    this.customersCompanies.push(data);

    return data;
  }

  public async delete(customer_company_id: string): Promise<void> {
    const index = this.customersCompanies.findIndex(customerCompany => customerCompany.id === customer_company_id);

    this.customersCompanies.splice(index, 1);
  }

}