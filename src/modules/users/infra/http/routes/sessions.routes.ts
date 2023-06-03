import { celebrate } from "celebrate";
import { Router } from "express";

import { refreshTokenValidator } from "@modules/users/validator/RefreshTokenValidator";
import { sessionValidator } from "@modules/users/validator/SessionValidator";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { GoogleAuthenticationController } from "../controllers/GoogleAuthenticationController";
import { RefreshTokenUserController } from "../controllers/RefreshTokenUserController";


const authenticateRouter = Router();
const authenticateController = new AuthenticateUserController();
const googleAuthenticationController = new GoogleAuthenticationController();
const refreshTokenUserController = new RefreshTokenUserController();

authenticateRouter.post("/", celebrate(sessionValidator), authenticateController.handle);
authenticateRouter.post("/google-auth", googleAuthenticationController.handle);
authenticateRouter.post(
  "/refresh-token",
  celebrate(refreshTokenValidator),
  refreshTokenUserController.handle
);

export default authenticateRouter;
