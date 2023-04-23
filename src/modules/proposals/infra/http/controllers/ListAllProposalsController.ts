import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllProposalsService } from "@modules/proposals/services/ListAllProposalsService";

export class ListAllProposalsController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { objective, description, status } = request.query;

    const listAllProposalsService = container.resolve(ListAllProposalsService);

    const proposals = await listAllProposalsService.execute({
      user_id: id,
      objective: objective ? String(objective) : undefined,
      description: description ? String(description) : undefined,
      status: status ? String(status) : undefined
    });

    return response.status(201).json(proposals);
  }
}