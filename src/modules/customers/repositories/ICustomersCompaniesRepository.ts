import { ICreateCustomerCompanyDTO } from "../dtos/ICreateCustomerCompanyDTO";
import { CustomerCompany } from "../infra/prisma/entities/CustomerCompany";

export interface ICustomersCompaniesRepository {

  create(data: ICreateCustomerCompanyDTO): Promise<CustomerCompany>;

  findCustomerByCompany(company_id: string): Promise<CustomerCompany[]>;

  delete(customer_company_id: string): Promise<void>;
}