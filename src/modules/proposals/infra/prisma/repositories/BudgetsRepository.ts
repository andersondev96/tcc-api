import { prisma } from "@database/prisma";
import { ICreateBudgetDTO } from "@modules/proposals/dtos/ICreateBudgetDTO";
import { IBudgetsRepository } from "@modules/proposals/repositories/IBudgetsRepository";

import { Budget } from "../entities/Budget";

export class BudgetsRepository implements IBudgetsRepository {

  public async create({
    id,
    customer_id,
    company_id,
    proposal_id,
    description,
    files,
    delivery_date,
    amount,
    installments
  }: ICreateBudgetDTO): Promise<Budget> {
    const budget = await prisma.budget.create({
      data: {
        id,
        customer_id,
        company_id,
        proposal_id,
        description,
        files,
        delivery_date,
        amount,
        installments
      }
    });

    return budget;
  }
  public async findBudgetByProposal(proposal_id: string): Promise<Budget> {
    const budget = await prisma.budget.findUnique({
      where: { proposal_id }
    });

    return budget;
  }

  public async findBudgetById(budget_id: string): Promise<Budget> {
    const budget = await prisma.budget.findUnique({
      where: { id: budget_id }
    });

    return budget;
  }

  public async update(data: ICreateBudgetDTO): Promise<Budget> {
    const budget = await prisma.budget.update({
      where: { id: data.id },
      data: { ...data }
    });

    return budget;
  }

}