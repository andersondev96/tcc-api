import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowServiceService } from "@modules/services/services/ShowServiceService";

export class ShowServiceController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { service_id } = request.params;

    const showServiceService = container.resolve(ShowServiceService);

    const service = await showServiceService.execute(service_id);

    return response.status(200).json(service);
  }
}