import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowCustomerByUserService } from "@modules/customers/services/ShowCustomerByUserService";

export class ShowCustomerByUserController {

  public async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const showCustomerByUserService = container.resolve(ShowCustomerByUserService);

    const customer = await showCustomerByUserService.execute(id);

    return response.status(201).json(customer);
  }
}