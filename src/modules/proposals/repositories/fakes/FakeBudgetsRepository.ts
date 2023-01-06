import { v4 as uuid } from "uuid";

import { Customer } from "@modules/customers/infra/prisma/entities/Customer";
import { ICreateBudgetDTO } from "@modules/proposals/dtos/ICreateBudgetDTO";
import { Budget } from "@modules/proposals/infra/prisma/entities/Budget";
import { Proposal } from "@modules/proposals/infra/prisma/entities/Proposal";
import { User } from "@prisma/client";

import { IBudgetsRepository } from "../IBudgetsRepository";

export class FakeBudgetRepository implements IBudgetsRepository {

  budgets: Budget[] = [];
  proposals: Proposal[] = [];
  users: User[] = [];
  customer: Customer[] = [];

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

  public async listBudgetsByObjectiveOrName(objective?: string, name?: string): Promise<Budget[]> {
    const proposal = this.proposals.find(prop => prop.objective === objective);

    const user = this.users.find(user => user.name === name);
    const customer = this.customer.find(customer => customer.user_id === user.id);

    const listBudgets = this.budgets.filter(budget => budget.proposal_id === proposal.id || budget.customer_id === customer.id);

    return listBudgets;
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