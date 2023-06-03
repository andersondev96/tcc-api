import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteProposalService } from "@modules/proposals/services/DeleteProposalService";

export class DeleteProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { proposal_id } = request.params;

    const deleteProposalService = container.resolve(DeleteProposalService);

    await deleteProposalService.execute(proposal_id);

    return response.send().status(201);
  }
}