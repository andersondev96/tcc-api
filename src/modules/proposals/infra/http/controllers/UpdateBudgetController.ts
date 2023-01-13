import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateBudgetService } from "@modules/proposals/services/UpdateBudgetService";

export class UpdateBudgetController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { budget_id } = request.params;

    const { description, delivery_date, amount, installments } = request.body;

    const updateBudgetService = container.resolve(UpdateBudgetService);

    const budget = await updateBudgetService.execute({
      budget_id,
      description,
      delivery_date,
      amount,
      installments
    });

    return response.status(201).json(budget);
  }
}