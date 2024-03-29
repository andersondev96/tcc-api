import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteImagesCompanyService } from "@modules/companies/services/DeleteImagesCompanyService";

export class DeleteImagesCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteImagesCompanyService = container.resolve(DeleteImagesCompanyService);

    await deleteImagesCompanyService.execute(id);

    return response.send().status(200);
  }
}