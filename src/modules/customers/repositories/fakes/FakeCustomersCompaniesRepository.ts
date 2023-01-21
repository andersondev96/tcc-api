import { v4 as uuid } from "uuid";

import { ICreateCustomerCompanyDTO } from "@modules/customers/dtos/ICreateCustomerCompanyDTO";
import { Customer } from "@modules/customers/infra/prisma/entities/Customer";
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

  public async findCustomerByCompany(company_id: string): Promise<CustomerCompany[]> {
    const customerCompany = this.customersCompanies.filter(customerCompany => customerCompany.company_id === company_id);

    return customerCompany;
  }

  public async delete(customer_company_id: string): Promise<void> {
    const index = this.customersCompanies.findIndex(customerCompany => customerCompany.id === customer_company_id);

    this.customersCompanies.splice(index, 1);
  }

  public async findCompanyWithCustomer(company_id: string, customer_id: string): Promise<CustomerCompany> {
    const customerCompany = this.customersCompanies.find(
      customerCompany => customerCompany.company_id === company_id &&
        customerCompany.customer_id === customer_id
    );

    return customerCompany;
  }

}