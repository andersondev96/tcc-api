import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateCompanyService } from "@modules/companies/services/UpdateCompanyService";

export class UpdateCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const {
      name,
      cnpj,
      category_id,
      description,
      services,
      physical_localization,
      telephone,
      whatsapp,
      email,
      website,
      cep,
      street,
      district,
      number,
      state,
      city
    } = request.body;

    const updateCompanyService = container.resolve(UpdateCompanyService);

    const updateCompany = await updateCompanyService.execute({
      id,
      name,
      cnpj,
      category_id,
      description,
      services,
      physical_localization,
      telephone,
      whatsapp,
      email,
      website,
      cep,
      street,
      district,
      number,
      state,
      city
    });

    return response.json(updateCompany);
  }
}