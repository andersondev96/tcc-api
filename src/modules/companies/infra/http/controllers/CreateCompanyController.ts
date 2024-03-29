import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateCompanyService } from "@modules/companies/services/CreateCompanyService";

export class CreateCompanyController {

  async handle(request: Request, response: Response): Promise<Response> {

    const user_id = request.user.id;
    const {
      name,
      cnpj,
      category_id,
      description,
      services,
      schedules,
      physical_localization,
      cep,
      street,
      district,
      number,
      telephone,
      whatsapp,
      email,
      website
    } = request.body;

    const createCompanyService = container.resolve(CreateCompanyService);

    const company = await createCompanyService.execute({
      name,
      cnpj,
      category_id,
      description,
      services,
      schedules,
      physical_localization,
      cep,
      street,
      district,
      number,
      telephone,
      whatsapp,
      email,
      website,
      user_id
    });

    return response.status(201).json(company);

  }
}