import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindCompanyByUserService } from "@modules/companies/services/FindCompanyByUserService";

export class FindCompanyByUserController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    console.log(user_id);

    const findCompanyByUserService = container.resolve(FindCompanyByUserService);

    const company = await findCompanyByUserService.execute(user_id);

    return response.status(201).json(company);
  }
}