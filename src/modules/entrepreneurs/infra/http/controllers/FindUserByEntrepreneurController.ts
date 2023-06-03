import { Request, Response } from "express";
import { container } from "tsyringe";

import { FindUserByEntrepreneurService } from "@modules/entrepreneurs/services/FindUserByEntrepreneurService";

export class FindUserByEntrepreneurController {

  public async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const findUserByEntrepreneurService = container.resolve(FindUserByEntrepreneurService);

    const entrepreneur = await findUserByEntrepreneurService.execute(id);

    return response.status(201).json(entrepreneur);

  }
}