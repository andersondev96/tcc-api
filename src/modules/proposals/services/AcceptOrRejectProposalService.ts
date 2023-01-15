import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class AcceptOrRejectProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute(proposal_id: string, status: string): Promise<Proposal> {
    const proposalAlreadyExists = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposalAlreadyExists) {
      throw new AppError("Proposal not found");
    }

    if (status === "accept") {
      status = "Proposal accepted";
    } else if (status === "reject") {
      status = "Proposal rejected";
    } else {
      throw new AppError("Response invalid");
    }

    const proposal = await this.proposalRepository.updateStatus(proposal_id, status);

    return proposal;
  }
}