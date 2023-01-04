import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindServiceByCompanyService } from "@modules/services/services/FindServiceByCompanyService";

export class FindServiceByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const findServiceByCompanyService = container.resolve(FindServiceByCompanyService);

    const services = await findServiceByCompanyService.execute(company_id);

    return response.status(201).json(services);
  }
}