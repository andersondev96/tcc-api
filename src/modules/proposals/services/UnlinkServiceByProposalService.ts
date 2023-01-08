import { inject, injectable } from "tsyringe";

import { IServicesProposalsRepository } from "../repositories/IServicesProposalsRepository";

@injectable()
export class UnlinkServiceByProposalService {

  constructor(
    @inject("ServicesProposalsRepository")
    private serviceProposalRepository: IServicesProposalsRepository
  ) { }
  public async execute(service_proposal_id: string): Promise<void> {
    const serviceProposal = await this.serviceProposalRepository.delete(service_proposal_id);

    return serviceProposal;
  }
}