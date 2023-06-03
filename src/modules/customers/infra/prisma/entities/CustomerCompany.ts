import { User } from "@modules/users/infra/prisma/entities/User";

import { Customer } from "./Customer";

export class CustomerCompany {
  id?: string;
  company_id: string;
  customer_id: string;
  customer?: Customer;
  user?: User;

  constructor({ company_id, customer_id, customer, user }: CustomerCompany) {
    Object.assign(this, {
      company_id,
      customer_id,
      customer,
      user
    });
  }
}