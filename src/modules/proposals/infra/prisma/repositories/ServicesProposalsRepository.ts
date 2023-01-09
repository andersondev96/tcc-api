import { prisma } from "@database/prisma";
import { ICreateServiceProposalDTO } from "@modules/proposals/dtos/ICreateServiceProposalDTO";
import { IServicesProposalsRepository } from "@modules/proposals/repositories/IServicesProposalsRepository";

import { ServiceProposal } from "../entities/ServiceProposal";

export class ServicesProposalsRepository implements IServicesProposalsRepository {

  public async create({
    id,
    service_id,
    proposal_id,
    customer_id
  }: ICreateServiceProposalDTO): Promise<ServiceProposal> {
    const serviceProposal = await prisma.service_Proposal.create({
      data: {
        id,
        service_id,
        proposal_id,
        customer_id
      }
    });

    return serviceProposal;
  }

  public async listServicesByProposal(proposal_id: string): Promise<ServiceProposal[]> {
    const listAll = await prisma.service_Proposal.findMany({
      where: { proposal_id }
    });

    return listAll;
  }

  public async listServicesProposalById(id: string): Promise<ServiceProposal> {
    const listServiceProposal = await prisma.service_Proposal.findUnique({
      where: { id }
    });

    return listServiceProposal;
  }

  public async update(data: ICreateServiceProposalDTO): Promise<ServiceProposal> {
    const serviceProposal = await prisma.service_Proposal.update({
      where: { id: data.id },
      data: { ...data }
    });

    return serviceProposal;
  }

  public async delete(id: string): Promise<void> {
    await prisma.service_Proposal.delete({
      where: { id }
    });
  }

}