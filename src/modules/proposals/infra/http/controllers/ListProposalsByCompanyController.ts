import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListProposalsByCompanyService } from "@modules/proposals/services/ListProposalsByCompanyService";

export class ListProposalsByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { company_id } = request.params;

    const { page, perPage, objective, description, status, name } = request.query;

    const listProposalsByCompanyService = container.resolve(ListProposalsByCompanyService);

    const proposals = await listProposalsByCompanyService.execute({
      company_id,
      page: page ? parseInt(page as string) : undefined,
      perPage: perPage ? parseInt(perPage as string) : undefined,
      objective: objective ? String(objective) : undefined,
      description: description ? String(description) : undefined,
      status: status ? String(status) : undefined,
      name: name ? String(name) : undefined
    });

    return response.status(201).json(proposals);
  }
}