import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class DeleteProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute(proposal_id: string): Promise<void> {

    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposal) {
      throw new AppError("Proposal not found");
    }

    await this.proposalRepository.delete(proposal_id);
  }
}