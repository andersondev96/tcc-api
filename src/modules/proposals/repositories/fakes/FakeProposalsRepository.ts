import { v4 as uuid } from "uuid";

import { Company } from "@modules/companies/infra/prisma/entities/Company";
import { Customer } from "@modules/customers/infra/prisma/entities/Customer";
import { ICreateProposalDTO } from "@modules/proposals/dtos/ICreateProposalDTO";
import { Proposal } from "@modules/proposals/infra/prisma/entities/Proposal";
import { User } from "@modules/users/infra/prisma/entities/User";

import { IProposalsRepository } from "../IProposalsRepository";

export class FakeProposalsRepository implements IProposalsRepository {
  proposals: Proposal[] = [];
  users: User[] = [];
  customer: Customer[] = [];
  company: Company[] = [];

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

  public async listProposalsByObjectiveOrName(company_id, objective?: string, name?: string): Promise<Proposal[]> {
    const company = this.proposals.find(proposal => proposal.company_id === company_id);

    const user = this.users.find(user => user.name === name);

    const proposalCompany = this.proposals.filter(proposal => proposal.company_id === company.id);

    const proposal = proposalCompany.filter(proposalCompany => proposalCompany.customer.user_id === user.id || proposalCompany.objective === objective);

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