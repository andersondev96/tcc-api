import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateServiceService } from "@modules/services/services/CreateServiceService";

export class CreateServiceController {
  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const { name, description, price, category, highlight_service } = request.body;

    const createServiceService = container.resolve(CreateServiceService);

    const service = await createServiceService.execute({
      name,
      description,
      price,
      category,
      highlight_service,
      company_id
    });

    return response.status(201).json(service);
  }
}
