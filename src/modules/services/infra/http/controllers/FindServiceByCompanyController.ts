import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindServiceByCompanyService } from "@modules/services/services/FindServiceByCompanyService";

export class FindServiceByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const { page, perPage, name, category, highlight_service } = request.query;

    const serviceName = typeof name === "string" ? name : "";
    const serviceCategory = typeof category === "string" ? category : "";
    const serviceHighlightService = typeof highlight_service === "boolean" ? highlight_service : false;

    const findServiceByCompanyService = container.resolve(FindServiceByCompanyService);

    const services = await findServiceByCompanyService.execute({
      company_id,
      page: page ? parseInt(page as string) : undefined,
      perPage: perPage ? parseInt(perPage as string) : undefined,
      name: serviceName,
      category: serviceCategory,
      highlight_service: serviceHighlightService
    });

    return response.status(201).json(services);
  }
}