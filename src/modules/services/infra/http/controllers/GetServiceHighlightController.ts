import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetServiceHighlightService } from "@modules/services/services/GetServiceHighlightService";

export class GetServiceHighlightController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { service_id } = request.params;

    const getServiceHighlightService = container.resolve(GetServiceHighlightService);

    await getServiceHighlightService.execute(service_id);

    return response.status(204).send();

  }
}