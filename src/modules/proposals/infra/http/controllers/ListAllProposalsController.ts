import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllProposalsService } from "@modules/proposals/services/ListAllProposalsService";

export class ListAllProposalsController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listAllProposalsService = container.resolve(ListAllProposalsService);

    const proposals = await listAllProposalsService.execute(id);

    return response.status(201).json(proposals);
  }
}