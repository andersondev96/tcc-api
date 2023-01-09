import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListServicesByProposalService } from "@modules/proposals/services/ListServicesByProposalService";

export class ListServicesByProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { proposal_id } = request.params;

    const listServicesByProposalService = container.resolve(ListServicesByProposalService);

    const servicesByProposals = await listServicesByProposalService.execute(proposal_id);

    return response.status(201).json(servicesByProposals);
  }
}