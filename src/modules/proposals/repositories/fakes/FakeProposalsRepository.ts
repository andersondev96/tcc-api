import { v4 as uuid } from "uuid";

import { ICreateProposalDTO } from "@modules/proposals/dtos/ICreateProposalDTO";
import { Proposal } from "@modules/proposals/infra/prisma/entities/Proposal";

import { IProposalsRepository } from "../IProposalsRepository";

export class FakeProposalsRepository implements IProposalsRepository {
  proposals: Proposal[] = [];

  public async create(data: ICreateProposalDTO): Promise<Proposal> {
    Object.assign(data, {
      id: uuid()
    });

    this.proposals.push(data);

    return data;
  }

  public async listProposalsByCustomer(customer_id: string): Promise<Proposal[]> {
    const proposals = this.proposals.filter(proposal => proposal.customer_id === customer_id);

    return proposals;
  }

  public async listProposalsByCompany(company_id: string): Promise<Proposal[]> {
    const proposals = this.proposals.filter(proposal => proposal.company_id === company_id);

    return proposals;
  }


  public async findProposalById(proposal_id: string): Promise<Proposal> {
    const proposal = this.proposals.find(proposal => proposal.id === proposal_id);

    return proposal;
  }

  public async update(data: ICreateProposalDTO): Promise<Proposal> {
    const index = this.proposals.findIndex(proposal => proposal.id === data.id);

    this.proposals[index] = data;

    return data;
  }

  public async delete(proposal_id: string): Promise<void> {
    const index = this.proposals.findIndex(proposal => proposal.id === proposal_id);

    this.proposals.splice(index, 1);
  }
}