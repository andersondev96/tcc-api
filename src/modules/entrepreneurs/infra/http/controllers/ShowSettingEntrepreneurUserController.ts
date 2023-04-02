import { Request, Response } from "express";
import { container } from "tsyringe";

import { ShowSettingEntrepreneurUserService } from "@modules/entrepreneurs/services/ShowSettingEntrepreneurUserService";

export class ShowSettingEntrepreneurUserController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const showSettingEntrepreneurUserService = container.resolve(
      ShowSettingEntrepreneurUserService
    );

    const settings = await showSettingEntrepreneurUserService.execute(id);

    return response.status(200).json(settings);
  }
}