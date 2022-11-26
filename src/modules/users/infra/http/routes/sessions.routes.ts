import { celebrate } from "celebrate";
import { Router } from "express";

import { refreshTokenValidator } from "@modules/users/validator/RefreshTokenValidator";
import { sessionValidator } from "@modules/users/validator/SessionValidator";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { RefreshTokenUserController } from "../controllers/RefreshTokenUserController";


const authenticateRouter = Router();
const authenticateController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

authenticateRouter.post("/", celebrate(sessionValidator), authenticateController.handle);
authenticateRouter.post(
  "/refresh-token",
  celebrate(refreshTokenValidator),
  refreshTokenUserController.handle
);

export default authenticateRouter;
