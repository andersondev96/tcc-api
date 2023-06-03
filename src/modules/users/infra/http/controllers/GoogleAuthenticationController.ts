import { Request, Response } from "express";
import { container } from "tsyringe";

import { GoogleAuthenticationService } from "@modules/users/services/GoogleAuthenticationService";

export class GoogleAuthenticationController {

  public async handle(request: Request, response: Response) {
    const { name, email, avatar } = request.body;

    const googleAuthenticationService = container.resolve(GoogleAuthenticationService);

    const auth = await googleAuthenticationService.execute({
      name,
      email,
      avatar
    });

    return response.status(201).json(auth);
  }
}