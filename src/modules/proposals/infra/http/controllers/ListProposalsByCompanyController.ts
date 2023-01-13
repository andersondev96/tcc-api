import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProposalsByCompanyService } from "@modules/proposals/services/ListProposalsByCompanyService";

export class ListProposalsByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { company_id } = request.params;

    const listProposalsByCompanyService = container.resolve(ListProposalsByCompanyService);

    const proposals = await listProposalsByCompanyService.execute(company_id);

    return response.status(201).json(proposals);
  }
}