import { Request, Response } from "express";
import { container } from "tsyringe";

import { UnlinkServiceByProposalService } from "@modules/proposals/services/UnlinkServiceByProposalService";

export class UnlinkServiceByProposalController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { service_proposal_id } = request.params;

    const unlinkServiceByProposalService = container.resolve(UnlinkServiceByProposalService);

    await unlinkServiceByProposalService.execute(service_proposal_id);

    return response.send().status(201);
  }
}