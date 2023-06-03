import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindByCompanyService } from "@modules/companies/services/FindByCompanyService";

export class FindByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const findByCompanyService = container.resolve(FindByCompanyService);

    const company = await findByCompanyService.execute(id);

    return response.status(200).json(company);
  }
}