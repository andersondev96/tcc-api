import { inject, injectable } from "tsyringe";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class FindProposalByIdService {

  constructor(
    @inject("proposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute(proposal_id: string): Promise<Proposal> {
    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    return proposal;
  }
}