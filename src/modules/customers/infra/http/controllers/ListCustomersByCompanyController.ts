import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCustomersByCompanyService } from "@modules/customers/services/ListCustomersByCompanyService";

export class ListCustomersByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const { page, perPage, name, email } = request.query;

    const listCustomerByCompanyService = container.resolve(ListCustomersByCompanyService);

    const customers = await listCustomerByCompanyService.execute({
      company_id,
      page: parseInt(page as string),
      perPage: parseInt(perPage as string),
      name: name ? String(name) : undefined,
      email: email ? String(email) : undefined
    });

    return response.status(201).json(customers);
  }
}