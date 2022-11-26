import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateImageCompanyService } from "@modules/companies/services/CreateImageCompanyService";

interface IFiles {
  filename: string;
}

export class CreateImageCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const company = request.files as IFiles[];

    const createImageCompanyService = container.resolve(CreateImageCompanyService);

    const imagesName = company.map((file) => file.filename);

    await createImageCompanyService.execute({
      company_id: id,
      images_name: imagesName,
    });

    return response.status(201).send();
  }
}