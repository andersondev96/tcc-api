import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Budget } from "../infra/prisma/entities/Budget";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  budget_id: string;
  description: string;
  delivery_date?: Date;
  amount: number;
  installments: number;
}

@injectable()
export class UpdateBudgetService {

  constructor(
    @inject("BudgetsRepository")
    private budgetRepository: IBudgetsRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute({
    budget_id,
    description,
    delivery_date,
    amount,
    installments
  }: IRequest): Promise<Budget> {
    const budgetAlreadyExists = await this.budgetRepository.findBudgetById(budget_id);

    if (!budgetAlreadyExists) {
      throw new AppError("Budget not found");
    }

    const budget = await this.budgetRepository.update({
      id: budget_id,
      customer_id: budgetAlreadyExists.customer_id,
      company_id: budgetAlreadyExists.company_id,
      proposal_id: budgetAlreadyExists.proposal_id,
      description,
      delivery_date: new Date(delivery_date),
      amount,
      installments
    });

    await this.proposalRepository.updateStatus(budget.proposal_id, "Orçamento atualizado (Aguardando resposta)");

    const returnBudget = {
      ...budget,
      files: budget.files.map((file) => {
        return file.length > 0
          ? `${process.env.APP_API_URL}/budgets/${file}`
          : undefined
      })
    }

    return returnBudget;


  }
}