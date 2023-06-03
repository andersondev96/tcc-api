import { Company } from "@modules/companies/infra/prisma/entities/Company";

export class Entrepreneur {
  id?: string;
  user_id: string;
  company_id?: string;
  company?: Company;

  constructor({ user_id, company }: Entrepreneur) {
    return Object.assign(this, {
      user_id,
      company
    });
  }
}