import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListSubcategoriesToCategoriesService } from "@modules/categories/services/ListSubcategoriesToCategoriesService";

export class ListSubcategoriesToCategoriesController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { category_id } = request.params;

    const listSubcategoriesToCategoriesService = container.resolve(ListSubcategoriesToCategoriesService);

    const subcategories = await listSubcategoriesToCategoriesService.execute(category_id);

    return response.status(201).json(subcategories);
  }
}