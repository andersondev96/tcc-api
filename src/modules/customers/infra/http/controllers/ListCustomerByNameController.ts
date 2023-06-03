import { Request, Response } from "express";
import { container } from "tsyringe";

import { ListCustomerByNameService } from "@modules/customers/services/ListCustomerByNameService";

export class ListCustomersByNameController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { company_id } = request.params;

    const { name } = request.query;

    const listCustomersByNameService = container.resolve(ListCustomerByNameService);

    const customers = await listCustomersByNameService.execute({
      company_id,
      name: String(name)
    });

    return response.status(201).json(customers);
  }
}