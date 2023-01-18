import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCustomersByCompanyService } from "@modules/customers/services/ListCustomersByCompanyService";

export class ListCustomersByCompanyController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.body;

    const listCustomerByCompanyService = container.resolve(ListCustomersByCompanyService);

    const customers = await listCustomerByCompanyService.execute(company_id);

    return response.status(201).json(customers);
  }
}