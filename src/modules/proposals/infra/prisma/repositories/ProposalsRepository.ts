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
      },
      include: {
        company: {
          include: {
            user: true
          }
        },
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return proposal;
  }

  public async listProposalsByCustomer(customer_id: string): Promise<Proposal[]> {
    const proposals = await prisma.proposal.findMany({
      where: { customer_id },
      include: {
        company: {
          include: {
            user: true
          }
        },
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return proposals;
  }

  public async listProposalsByCompany(company_id: string): Promise<Proposal[]> {
    const proposals = await prisma.proposal.findMany({
      where: { company_id },
      include: {
        company: true,
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return proposals;
  }

  public async listProposalsByObjectiveOrName(company_id: string, objective?: string, name?: string): Promise<Proposal[]> {
    const proposals = await prisma.proposal.findMany({
      where: {
        company_id,
        OR: [
          {
            objective: {
              contains: objective
            }
          },
          {
            customer: {
              user: {
                name: {
                  contains: name
                }
              }
            }
          }
        ]
      },
      include: {
        company: true,
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return proposals;
  }

  public async findProposalById(proposal_id: string): Promise<Proposal> {
    const proposal = await prisma.proposal.findUnique({
      where: { id: proposal_id },
      include: {
        company: true,
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return proposal;
  }

  public async update(data: ICreateProposalDTO): Promise<Proposal> {
    const proposal = await prisma.proposal.update({
      where: { id: data.id },
      data: { ...data },
      include: {
        company: {
          include: {
            user: true
          }
        },
        customer: {
          include: {
            user: true
          }
        }
      }
    });

    return proposal;
  }

  public async updateStatus(id: string, status: string): Promise<Proposal> {
    const proposal = await prisma.proposal.update({
      where: { id },
      data: { status }
    });

    return proposal;
  }

  public async delete(proposal_id: string): Promise<void> {
    await prisma.proposal.delete({
      where: { id: proposal_id }
    });
  }

} 