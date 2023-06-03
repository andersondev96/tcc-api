import { Request, Response } from "express";
import { container } from "tsyringe";

import { UploadImageLogoCompanyEntrepreneurService } from "@modules/entrepreneurs/services/UploadImageLogoCompanyEntrepreneurService";

export class UploadImageLogoCompanyEntrepreneurController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { entrepreneur_id } = request.params;
    const company_logo = request.file.filename;

    const uploadImageLogoCompanyEntrepreneurController = container.resolve(
      UploadImageLogoCompanyEntrepreneurService
    );

    await uploadImageLogoCompanyEntrepreneurController.execute(
      entrepreneur_id,
      company_logo
    );

    return response.status(204).send();
  }
}