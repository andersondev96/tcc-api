import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IServicesProposalsRepository } from "../repositories/IServicesProposalsRepository";

@injectable()
export class UnlinkServiceByProposalService {

  constructor(
    @inject("ServicesProposalsRepository")
    private serviceProposalRepository: IServicesProposalsRepository
  ) { }
  public async execute(service_proposal_id: string): Promise<void> {
    const serviceProposalAlreadyExists = await this.serviceProposalRepository.listServicesProposalById(service_proposal_id);

    if (!serviceProposalAlreadyExists) {
      throw new AppError("Service proposal not found");
    }

    const serviceProposal = await this.serviceProposalRepository.delete(service_proposal_id);

    return serviceProposal;
  }
}