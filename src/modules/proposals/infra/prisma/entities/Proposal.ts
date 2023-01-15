import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateCustomerDTO";

export class Proposal {
  id?: string;
  objective: string;
  time?: Date;
  description?: string;
  status?: string;
  customer_id: string;
  company_id: string;
  company?: ICreateCompanyDTO;
  customer?: ICreateCustomerDTO;

  constructor({ objective, description, status, customer_id, company_id, company, customer }: Proposal) {
    Object.assign({
      objective,
      description,
      status,
      customer_id,
      company_id,
      company,
      customer
    });
  }
}