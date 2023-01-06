import { Prisma } from "@prisma/client";

export class Budget {
  id?: string;
  customer_id: string;
  company_id: string;
  proposal_id: string;
  description: string;
  files?: string;
  delivery_date: Date;
  amount: Prisma.Decimal;
  installments: number;

  constructor({
    customer_id,
    company_id,
    proposal_id,
    description,
    delivery_date,
    amount,
    installments
  }: Budget) {
    Object.assign(this, {
      customer_id,
      company_id,
      proposal_id,
      description,
      delivery_date,
      amount,
      installments
    });
  }
}