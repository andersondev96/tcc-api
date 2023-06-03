import { Request, Response } from "express";
import { container } from "tsyringe";

import { LinkServiceByProposalService } from "@modules/proposals/services/LinkServiceByProposalService";

export class LinkServiceByProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { proposal_id } = request.params;

    const { service_id, customer_id } = request.body;

    const linkServiceByProposalService = container.resolve(LinkServiceByProposalService);

    const serviceProposal = await linkServiceByProposalService.execute(
      service_id,
      proposal_id,
      customer_id
    );

    return response.status(201).json(serviceProposal);
  }
}