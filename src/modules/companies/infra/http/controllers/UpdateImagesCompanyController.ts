import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateImagesCompanyService } from "@modules/companies/services/UpdateImagesCompanyService";

export class UpdateImagesCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const company = request.file.filename;

    const updateImagesCompanyService = container.resolve(UpdateImagesCompanyService);

    await updateImagesCompanyService.execute(id, company);

    return response.status(204).send();
  }
}