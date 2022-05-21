import { Request, Response } from "express";
import { container } from "tsyringe";

import { RefreshTokenUserService } from "@modules/users/services/RefreshTokenUserService";

export class RefreshTokenUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const token =
      request.body.token ||
      request.headers["x-access-token"] ||
      request.query.token;

    const refreshTokenUserService = container.resolve(RefreshTokenUserService);

    const refresh_token = await refreshTokenUserService.execute(token);

    return response.json(refresh_token);
  }
}
