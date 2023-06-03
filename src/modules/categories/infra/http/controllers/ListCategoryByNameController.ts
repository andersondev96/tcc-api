import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCategoryByNameService } from "@modules/categories/services/ListCategoryByNameService";

export class ListCategoryByNameController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { name } = request.query;

    console.log(name);

    const listCategoryByNameService = container.resolve(ListCategoryByNameService);

    const category = await listCategoryByNameService.execute(String(name));

    return response.status(201).json(category);
  }
}