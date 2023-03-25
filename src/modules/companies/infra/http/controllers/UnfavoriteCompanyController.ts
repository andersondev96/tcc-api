import { Request, Response } from "express";
import { container } from "tsyringe";

import { UnfavoriteCompanyService } from "@modules/companies/services/UnfavoriteCompanyService";

export class UnfavoriteCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const { company_id } = request.params;

    const unfavoriteCompanyService = container.resolve(UnfavoriteCompanyService);

    const favorite = await unfavoriteCompanyService.execute(id, company_id);

    return response.status(201).json(favorite);
  }
}