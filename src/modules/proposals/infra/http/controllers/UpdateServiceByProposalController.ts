import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateServiceByProposalService } from "@modules/proposals/services/UpdateServiceByProposalService";

export class UpdateServiceByProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { service_proposal_id } = request.params;

    const { service_id } = request.body;

    const updateServiceByProposalService = container.resolve(UpdateServiceByProposalService);

    const serviceProposal = await updateServiceByProposalService.execute({ service_proposal_id, service_id });

    return response.status(201).json(serviceProposal);
  }
}