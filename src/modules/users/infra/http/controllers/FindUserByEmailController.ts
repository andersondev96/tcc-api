import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindUserByEmailService } from "@modules/users/services/FindUserByEmailService";

export class FindUserByEmailController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;

    const findUserByEmailService = container.resolve(FindUserByEmailService);

    const user = await findUserByEmailService.execute(email);

    return response.status(200).json(user);
  }
}