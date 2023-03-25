import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListFavoritesService } from "@modules/users/services/ListFavoritesService";

export class ListFavoritesController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const listFavoritesService = container.resolve(ListFavoritesService);

    const favorites = await listFavoritesService.execute(id);

    return response.status(201).json(favorites);
  }
}