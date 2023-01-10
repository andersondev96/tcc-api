import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Budget } from "../infra/prisma/entities/Budget";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class ListBudgetByProposalService {

  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("BudgetsRepository")
    private budgetRepository: IBudgetsRepository
  ) { }

  public async execute(proposal_id: string): Promise<Budget> {

    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposal) {
      throw new AppError("Proposal not found");
    }

    const budget = await this.budgetRepository.findBudgetByProposal(proposal_id);

    return budget;
  }
}