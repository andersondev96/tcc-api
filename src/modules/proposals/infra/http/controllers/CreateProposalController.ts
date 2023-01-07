import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateProposalService } from "@modules/proposals/services/CreateProposalService";

export class CreateProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { company_id } = request.params;

    const { objective, time, description, telephone } = request.body;

    const createProposalService = container.resolve(CreateProposalService);

    const proposal = await createProposalService.execute({
      objective,
      time,
      description,
      telephone,
      company_id,
      user_id: id
    });

    return response.status(201).json(proposal);
  }
}