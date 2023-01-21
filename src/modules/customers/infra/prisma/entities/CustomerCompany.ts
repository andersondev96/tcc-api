
export class CustomerCompany {
  id?: string;
  company_id: string;
  customer_id: string;

  constructor({ company_id, customer_id }: CustomerCompany) {
    Object.assign(this, {
      company_id,
      customer_id
    });
  }
}