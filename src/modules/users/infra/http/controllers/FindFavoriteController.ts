import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindFavoriteService } from "@modules/users/services/FindFavoriteService";

export class FindFavoriteController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const { table_id } = request.params;

    const findFavoriteService = container.resolve(FindFavoriteService);

    const favorite = await findFavoriteService.execute(id, table_id);

    return response.status(201).json(favorite);
  }
}