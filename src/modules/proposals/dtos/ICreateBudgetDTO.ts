
export interface ICreateBudgetDTO {
  id?: string;
  customer_id: string;
  company_id: string;
  proposal_id: string;
  description: string;
  files?: string;
  delivery_date?: Date;
  amount: number;
  installments: number;
}