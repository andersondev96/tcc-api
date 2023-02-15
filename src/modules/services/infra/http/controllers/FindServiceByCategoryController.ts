import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindServiceByCategoryService } from "@modules/services/services/FindServiceByCategoryService";

export class FindServiceByCategoryController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { company_id } = request.params;

    const findServiceByCategoryService = container.resolve(FindServiceByCategoryService);

    const services = await findServiceByCategoryService.execute(company_id);

    return response.status(201).json(services);
  }
}