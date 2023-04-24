import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateImagesCompanyService } from "@modules/companies/services/UpdateImagesCompanyService";

export class UpdateImagesCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { company_id } = request.params;

    const { images } = request.body;

    const imageUpdates = images.map((image: { id: string, filename: string }) => (
      {
        id: image.id,
        image_name: image.filename,
        image_url: "http://localhost:3333/companies",
        company_id
      }));

    const updateImagesCompanyService = container.resolve(UpdateImagesCompanyService);

    await updateImagesCompanyService.execute({
      company_id,
      images: imageUpdates
    });

    return response.status(204).send();
  }
}