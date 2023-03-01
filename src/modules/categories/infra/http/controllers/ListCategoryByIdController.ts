import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryByIdService } from "@modules/categories/services/ListCategoryByIdService";

export class ListCategoryByIdController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { category_id } = request.params;

    console.log(category_id);

    const listCategoryByIdService = container.resolve(ListCategoryByIdService);

    const category = await listCategoryByIdService.execute(category_id);

    return response.status(201).json(category);
  }
}