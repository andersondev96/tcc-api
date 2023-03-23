import { Request, Response } from "express";
import { container } from "tsyringe";

import { FavoriteCompanyService } from "@modules/companies/services/FavoriteCompanyService";

export class FavoriteCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const { company_id } = request.params;

    const favoriteCompanyService = container.resolve(FavoriteCompanyService);

    const favorite = await favoriteCompanyService.execute(id, company_id);

    return response.status(201).json(favorite);
  }
}