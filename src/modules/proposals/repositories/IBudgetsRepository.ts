import { ICreateBudgetDTO } from "../dtos/ICreateBudgetDTO";
import { Budget } from "../infra/prisma/entities/Budget";

export interface IBudgetsRepository {

  create(data: ICreateBudgetDTO): Promise<Budget>;

  findBudgetByProposal(proposal_id: string): Promise<Budget>;

  findBudgetById(budget_id: string): Promise<Budget>;

  update(data: ICreateBudgetDTO): Promise<Budget>;

  uploadFiles(budget_id: string, files: string[]): Promise<Budget>;
}