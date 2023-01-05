
export class Proposal {
  id?: string;
  objective: string;
  time: Date;
  description?: string;
  customer_id: string;
  company_id: string;

  constructor({ objective, time, description, customer_id, company_id }: Proposal) {
    Object.assign({
      objective,
      time,
      description,
      customer_id,
      company_id
    });
  }
}