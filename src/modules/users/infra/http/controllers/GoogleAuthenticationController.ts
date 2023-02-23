import { Request, Response } from "express";

import { GoogleAuthenticationService } from "@modules/users/services/GoogleAuthenticationService";

export class GoogleAuthenticationController {

  public async handle(request: Request, response: Response) {
    const googleAuthenticationService = new GoogleAuthenticationService();

    const auth = googleAuthenticationService.SignInWithGoogle();

    return response.json(auth);
  }
}