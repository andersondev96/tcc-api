import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateImagesCompanyService } from "@modules/companies/services/UpdateImagesCompanyService";

export class UpdateImagesCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { company_id } = request.params;

    const images = request.body.images;

    const imagesName = images.map((image) => image.image_name);

    const updateImagesCompanyService = container.resolve(UpdateImagesCompanyService);

    await updateImagesCompanyService.execute({
      company_id,
      images: imagesName
    });

    return response.status(204).send();
  }
}