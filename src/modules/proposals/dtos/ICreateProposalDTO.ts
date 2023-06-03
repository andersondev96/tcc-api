
export interface ICreateProposalDTO {
  id?: string;
  objective: string;
  time?: Date;
  description?: string;
  status?: string;
  customer_id: string;
  company_id: string;
}