import { Request, Response } from "express";
import { container } from "tsyringe";

import { UnfavoriteServiceService } from "@modules/services/services/UnfavoriteServiceService";

export class UnfavoriteServiceController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const { service_id } = request.params;

    const unfavoriteServiceService = container.resolve(UnfavoriteServiceService);

    const favorite = await unfavoriteServiceService.execute({
      user_id: id,
      service_id
    });

    return response.status(201).json(favorite);
  }
}