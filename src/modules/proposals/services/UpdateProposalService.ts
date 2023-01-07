import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  proposal_id: string;
  objective: string;
  time?: Date;
  description?: string;
}


@injectable()
export class UpdateProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalsRepository: IProposalsRepository
  ) { }

  public async execute(data: IRequest): Promise<Proposal> {
    const proposalExists = await this.proposalsRepository.findProposalById(data.proposal_id);

    if (!proposalExists) {
      throw new AppError("Proposal not found");
    }

    const proposal = await this.proposalsRepository.update({
      id: data.proposal_id,
      objective: data.objective,
      time: data.time,
      description: data.description,
      customer_id: proposalExists.customer_id,
      company_id: proposalExists.company_id
    });

    return proposal;
  }
}