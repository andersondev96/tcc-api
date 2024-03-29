import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteCompanyService } from "@modules/companies/services/DeleteCompanyService";

export class DeleteCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const deleteCompanyController = container.resolve(DeleteCompanyService);

    await deleteCompanyController.execute(id);

    return response.send().status(200);
  }
}