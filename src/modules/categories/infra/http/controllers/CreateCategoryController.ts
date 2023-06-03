import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCategoryService } from "@modules/categories/services/CreateCategoryService";

export class CreateCategoryController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { name } = request.body;

    const createCategoryService = container.resolve(CreateCategoryService);

    const category = await createCategoryService.execute(name);

    return response.status(201).json(category);
  }
}