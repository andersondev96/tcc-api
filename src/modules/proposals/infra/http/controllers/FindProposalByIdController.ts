import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindProposalByIdService } from "@modules/proposals/services/FindProposalByIdService";

export class FindProposalByIdController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { proposal_id } = request.params;

    const findProposalByIdService = container.resolve(FindProposalByIdService);

    const proposal = await findProposalByIdService.execute(proposal_id);

    return response.status(201).json(proposal);
  }
}