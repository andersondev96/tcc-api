import { Request, Response } from "express";
import { container } from "tsyringe";

import { ResetUserPasswordService } from "@modules/users/services/ResetUserPasswordService";

export class ResetUserPasswordController {

  async handle(request: Request, response: Response): Promise<Response> {

    const { token } = request.query;

    const { password } = request.body;

    const resetUserPasswordService = container.resolve(ResetUserPasswordService);

    const new_password = await resetUserPasswordService.execute({ token: String(token), password });

    return response.json(new_password);

  }
}