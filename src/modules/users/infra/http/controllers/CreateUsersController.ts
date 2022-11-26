import { Request, Response } from "express";
import { container } from "tsyringe";

import { CreateUserService } from "@modules/users/services/CreateUserService";

export class CreateUsersController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password, isEntrepreneur } = request.body;

    const createUserService = container.resolve(CreateUserService);

    const user = await createUserService.execute({
      name,
      email,
      password,
      isEntrepreneur
    });

    return response.status(201).json(user);
  }
}
