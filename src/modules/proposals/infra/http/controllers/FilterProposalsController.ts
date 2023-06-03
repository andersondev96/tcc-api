import { Request, Response } from "express";
import { container } from "tsyringe";

import { FilterProposalsService } from "@modules/proposals/services/FilterProposalsService";

export class FilterProposalsController {

  public async handle(request: Request, response: Response) {
    const { company_id } = request.params;

    const { page, perPage, name, objective } = request.query;

    const filterProposalsService = container.resolve(FilterProposalsService);

    const proposals = await filterProposalsService.execute(
      company_id,
      parseInt(page as string),
      parseInt(perPage as string),
      String(name),
      String(objective)
    );

    return response.status(201).json(proposals);
  }
}