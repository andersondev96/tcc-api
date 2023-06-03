import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListAllCategoriesService } from "@modules/categories/services/ListAllCategoriesService";

export class ListAllCategoriesController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const listAllCategoriesService = container.resolve(ListAllCategoriesService);

    const categories = await listAllCategoriesService.execute();

    return response.status(201).json(categories);
  }
}