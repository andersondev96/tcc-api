import { ICreateBudgetDTO } from "../dtos/ICreateBudgetDTO";
import { Budget } from "../infra/prisma/entities/Budget";

export interface IBudgetsRepository {

  create(data: ICreateBudgetDTO): Promise<Budget>;

  findBudgetByProposal(proposal_id: string): Promise<Budget>;

  listBudgetsByObjectiveOrName(objective?: string, name?: string): Promise<Budget[]>;

  findBudgetById(budget_id: string): Promise<Budget>;

  update(data: ICreateBudgetDTO): Promise<Budget>;
}