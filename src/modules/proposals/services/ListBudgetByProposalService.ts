import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { getBudgetFiles } from "@shared/utils/getFilesUrl";
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

    let budget = await this.budgetRepository.findBudgetByProposal(proposal_id);

    if (budget) {
      budget = {
        ...budget,
        files: getBudgetFiles(budget, "budgets")
      }
    }

    console.log(budget);

    return budget;
  }
}