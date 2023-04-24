import { ICreateProposalDTO } from "../dtos/ICreateProposalDTO";
import { Proposal } from "../infra/prisma/entities/Proposal";

export interface IProposalsRepository {
  create(data: ICreateProposalDTO): Promise<Proposal>;

  listProposalsByCustomer(customer_id: string, per_page?: number, page?: number): Promise<Proposal[]>;

  listProposalsByCompany(company_id: string, per_page?: number, page?: number): Promise<Proposal[]>;

  findProposalById(proposal_id: string): Promise<Proposal>;

  listProposalsByObjectiveOrName(company_id: string, objective?: string, name?: string): Promise<Proposal[]>;

  update(data: ICreateProposalDTO): Promise<Proposal>;

  updateStatus(id: string, status: string): Promise<Proposal>;

  delete(proposal_id: string): Promise<void>;
}