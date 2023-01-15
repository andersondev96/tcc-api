import { Request, Response } from "express";
import { container } from "tsyringe";

import { AcceptOrRejectProposalService } from "@modules/proposals/services/AcceptOrRejectProposalService";

export class AcceptOrRejectProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { proposal_id } = request.params;

    const { status } = request.body;

    const acceptOrRejectProposalService = container.resolve(AcceptOrRejectProposalService);

    const proposal = await acceptOrRejectProposalService.execute(proposal_id, status);

    return response.status(201).json(proposal);
  }
}