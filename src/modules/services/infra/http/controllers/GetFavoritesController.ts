import { Request, Response } from "express";
import { container } from "tsyringe";

import { GetFavoritesService } from "@modules/services/services/GetFavoritesService";

export class GetFavoritesController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const { service_id } = request.params;

    const getFavoritesService = container.resolve(GetFavoritesService);

    await getFavoritesService.execute({
      user_id: id,
      service_id,
    });

    return response.status(204).send();
  }
}