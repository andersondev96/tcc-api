import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateImagesCompanyService } from "@modules/companies/services/UpdateImagesCompanyService";

interface IFiles {
  filename: string;
}
export class UpdateImagesCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { company_id } = request.params;

    const company = request.files as IFiles[];

    const imagesName = company.map((image) => image.filename);

    console.log(imagesName);

    const updateImagesCompanyService = container.resolve(UpdateImagesCompanyService);

    await updateImagesCompanyService.execute({
      company_id,
      images: imagesName
    });

    return response.status(204).send();
  }
}