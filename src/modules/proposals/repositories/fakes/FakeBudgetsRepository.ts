import { v4 as uuid } from "uuid";

import { ICreateBudgetDTO } from "@modules/proposals/dtos/ICreateBudgetDTO";
import { Budget } from "@modules/proposals/infra/prisma/entities/Budget";

import { IBudgetsRepository } from "../IBudgetsRepository";

export class FakeBudgetRepository implements IBudgetsRepository {

  budgets: Budget[] = [];

  public async create(data: ICreateBudgetDTO): Promise<Budget> {
    Object.assign(data, {
      id: uuid()
    });

    this.budgets.push(data);

    return data;
  }

  public async findBudgetByProposal(proposal_id: string): Promise<Budget> {
    const findBudget = this.budgets.find((budget) => budget.proposal_id === proposal_id);

    return findBudget;
  }

  public async findBudgetById(budget_id: string): Promise<Budget> {
    const findBudget = this.budgets.find(budget => budget.id === budget_id);

    return findBudget;
  }

  public async update(data: ICreateBudgetDTO): Promise<Budget> {
    const index = this.budgets.findIndex(budget => budget.id === data.id);

    this.budgets[index] = data;

    return data;
  }
}