import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Budget } from "../infra/prisma/entities/Budget";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  proposal_id: string;
  description: string;
  delivery_date: Date;
  amount: number;
  installments: number;
}

@injectable()
export class CreateBudgetService {
  constructor(
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("BudgetsRepository")
    private budgetRepository: IBudgetsRepository
  ) { }

  public async execute({
    proposal_id,
    description,
    delivery_date,
    amount,
    installments
  }: IRequest): Promise<Budget> {
    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposal) {
      throw new AppError("Proposal not found");
    }

    const budgetAlreadyExists = await this.budgetRepository.findBudgetByProposal(proposal_id);

    if (budgetAlreadyExists) {
      throw new AppError("Budget already exists");
    }

    const budget = await this.budgetRepository.create({
      proposal_id,
      customer_id: proposal.customer_id,
      company_id: proposal.company_id,
      description,
      delivery_date: new Date(delivery_date),
      amount,
      installments
    });

    return budget;

  }
}