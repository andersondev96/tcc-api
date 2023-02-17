import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportCategoryService } from "@modules/categories/services/ImportCategoryService";

export class ImportCategoryController {
  async handle(request: Request, response: Response): Promise<Response> {
    const filePath = request.file.path;

    const importCategoryService = container.resolve(ImportCategoryService);

    const categories = await importCategoryService.execute(filePath);

    return response.status(201).json(categories);
  }
}