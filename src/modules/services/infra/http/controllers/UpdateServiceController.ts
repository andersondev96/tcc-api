import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateServiceService } from "@modules/services/services/UpdateServiceService";

export class UpdateServiceController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { service_id } = request.params;

    const { name, description, price, category, highlight_service } = request.body;

    const updateServiceService = container.resolve(UpdateServiceService);

    const service = await updateServiceService.execute({
      id: service_id,
      name,
      description,
      price,
      category,
      highlight_service
    });

    return response.status(201).json(service);
  }
}