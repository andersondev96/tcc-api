import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateBudgetService } from "@modules/proposals/services/CreateBudgetService";

export class CreateBudgetController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { proposal_id } = request.params;

    const { description, delivery_date, amount, installments } = request.body;

    const createBudgetService = container.resolve(CreateBudgetService);

    const budget = await createBudgetService.execute({
      proposal_id,
      description,
      delivery_date,
      amount,
      installments
    });

    return response.status(201).json(budget);
  }
}