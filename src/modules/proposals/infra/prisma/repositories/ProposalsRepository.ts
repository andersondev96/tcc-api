import { prisma } from "@database/prisma";
import { ICreateProposalDTO } from "@modules/proposals/dtos/ICreateProposalDTO";
import { IProposalsRepository } from "@modules/proposals/repositories/IProposalsRepository";

import { Proposal } from "../entities/Proposal";

export class ProposalsRepository implements IProposalsRepository {

  public async create({
    id,
    objective,
    time,
    description,
    customer_id,
    company_id
  }: ICreateProposalDTO): Promise<Proposal> {
    const proposal = await prisma.proposal.create({
      data: {
        id,
        objective,
        time,
        description,
        customer_id,
        company_id
      }
    });

    return proposal;
  }

  public async listProposals(customer_id: string): Promise<Proposal[]> {
    const proposals = await prisma.proposal.findMany({
      where: { customer_id }
    });

    return proposals;
  }

  public async findProposalById(proposal_id: string): Promise<Proposal> {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposal_id }
    });

    return proposal;
  }

  public async update(data: ICreateProposalDTO): Promise<Proposal> {
    const proposal = await prisma.proposal.update({
      where: { id: data.id },
      data: { ...data }
    });

    return proposal;
  }

  public async delete(proposal_id: string): Promise<void> {
    await prisma.proposal.delete({
      where: { id: proposal_id }
    });
  }

} 