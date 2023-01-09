import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ServiceProposal } from "../infra/prisma/entities/ServiceProposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { IServicesProposalsRepository } from "../repositories/IServicesProposalsRepository";


@injectable()
export class ListServicesByProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("ServicesProposalsRepository")
    private serviceProposalRepository: IServicesProposalsRepository
  ) { }

  public async execute(proposal_id: string): Promise<ServiceProposal[]> {
    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposal) {
      throw new AppError("Proposal not found");
    }

    const servicesProposals = await this.serviceProposalRepository.listServicesByProposal(proposal_id);

    return servicesProposals;
  }
}