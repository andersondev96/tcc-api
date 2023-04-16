import { Company } from "@modules/companies/infra/prisma/entities/Company";
import { Customer } from "@modules/customers/infra/prisma/entities/Customer";

export class Proposal {
  id?: string;
  objective: string;
  time?: Date;
  description?: string;
  status?: string;
  customer_id: string;
  company_id: string;
  company?: Company;
  customer?: Customer;

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