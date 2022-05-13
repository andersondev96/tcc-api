import { CreateUserService } from "@modules/users/services/CreateUserService";
import { Request, Response } from "express";

import { UserRepository } from "../../prisma/repositories/UserRepository";

export class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const userRepository = new UserRepository();
    const createUserService = new CreateUserService(userRepository);

    const user = await createUserService.execute({
      name,
      email,
      password,
    });

    return response.status(201).json(user);
  }
}
