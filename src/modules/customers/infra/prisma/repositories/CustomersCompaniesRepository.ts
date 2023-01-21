import { prisma } from "@database/prisma";
import { ICreateCustomerCompanyDTO } from "@modules/customers/dtos/ICreateCustomerCompanyDTO";
import { ICustomersCompaniesRepository } from "@modules/customers/repositories/ICustomersCompaniesRepository";

import { CustomerCompany } from "../entities/CustomerCompany";

export class CustomersCompaniesRepository implements ICustomersCompaniesRepository {

  public async create({ id, customer_id, company_id }: ICreateCustomerCompanyDTO): Promise<CustomerCompany> {
    const customerCompany = await prisma.customer_Company.create({
      data: {
        id,
        customer_id,
        company_id
      }
    });

    return customerCompany;
  }

  public async findCustomerByCompany(company_id: string): Promise<CustomerCompany[]> {
    const customers = await prisma.customer_Company.findMany({
      where: {
        company_id
      },
      include: {
        customer: true
      }

    });

    return customers;
  }


  public async delete(customer_company_id: string): Promise<void> {
    await prisma.customer_Company.delete({
      where: {
        id: customer_company_id
      }
    });
  }

}