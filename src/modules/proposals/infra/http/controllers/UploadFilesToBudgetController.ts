import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadFilesToBudgetService } from "@modules/proposals/services/UploadFilesToBudgetService";

interface IFiles {
  filename: string;
}

export class UploadFilesToBudgetController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { budget_id } = request.params;
    const budget = request.files as IFiles[];

    const uploadFilesToBudgetService = container.resolve(UploadFilesToBudgetService);

    const budgetFilesName = budget.map((file) => file.filename);

    await uploadFilesToBudgetService.execute({
      budget_id,
      budget_files: budgetFilesName
    });

    return response.status(201).send();
  }

}