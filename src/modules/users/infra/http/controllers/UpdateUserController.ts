import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserService } from "@modules/users/services/UpdateUserService";

export class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {

    const { id } = request.user;

    const { name, email, password } = request.body;

    const updateUserService = container.resolve(
      UpdateUserService
    );

    const user = await updateUserService.execute({ id, name, email, password });

    return response.json(user);
  }
}
