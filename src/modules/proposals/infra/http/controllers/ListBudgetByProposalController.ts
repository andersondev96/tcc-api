import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListBudgetByProposalService } from "@modules/proposals/services/ListBudgetByProposalService";

export class ListBudgetProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { proposal_id } = request.params;

    const listBudgetByProposalService = container.resolve(ListBudgetByProposalService);

    const budget = await listBudgetByProposalService.execute(proposal_id);

    return response.status(201).json(budget);
  }
}