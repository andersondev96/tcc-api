import { Request, Response } from "express";
import { container } from "tsyringe";

import { ImportServiceService } from "@modules/services/services/ImportServiceService";

export class ImportServiceController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const file = request.file.path;

    const importServiceService = container.resolve(ImportServiceService);

    const importedServices = await importServiceService.execute(company_id, file);

    return response.status(201).json(importedServices);
  }
}