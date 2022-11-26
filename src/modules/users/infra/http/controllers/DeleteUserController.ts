import { Request, Response } from "express";
import { container } from "tsyringe";

import { DeleteUserService } from "@modules/users/services/DeleteUserService";

export class DeleteUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const deleteUserService = container.resolve(
      DeleteUserService
    );

    await deleteUserService.execute(id);

    return response.send().status(200);
  }
}
