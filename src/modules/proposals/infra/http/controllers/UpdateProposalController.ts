import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateProposalService } from "@modules/proposals/services/UpdateProposalService";

export class UpdateProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { proposal_id } = request.params;

    const { objective, time, description } = request.body;

    const updateProposalService = container.resolve(UpdateProposalService);

    const proposal = await updateProposalService.execute({
      proposal_id,
      objective,
      time,
      description
    });

    return response.status(201).json(proposal);
  }
}