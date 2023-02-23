
import { NextFunction, Request, Response, Router } from "express";

import { signInWithGoogle } from "@shared/infra/http/firebase";

const authGoogleRouter = Router();

authGoogleRouter.post("/google",
  async (request: Request, response: Response, next: NextFunction) => {

    try {
      const user = await signInWithGoogle();
      response.json(user);
    } catch (error) {
      next(error);
    }
  });

export default authGoogleRouter;