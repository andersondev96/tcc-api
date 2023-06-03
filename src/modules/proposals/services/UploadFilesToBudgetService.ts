import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { IBudgetsRepository } from "../repositories/IBudgetsRepository";

interface IRequest {
  budget_id: string;
  budget_files: string[];
}

@injectable()
export class UploadFilesToBudgetService {

  constructor(
    @inject("BudgetsRepository")
    private budgetRepository: IBudgetsRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }
  public async execute({ budget_id, budget_files }: IRequest): Promise<void> {

    const budget = await this.budgetRepository.findBudgetById(budget_id);

    if (!budget) {
      throw new AppError("Budget not found");
    }

    const filesBudget: string[] = [];


    budget_files.map(async (file) => {
      filesBudget.push(file);

      await this.storageProvider.save(file, "budgets");

      await this.budgetRepository.uploadFiles(
        budget_id,
        filesBudget
      );
    });

  }
}