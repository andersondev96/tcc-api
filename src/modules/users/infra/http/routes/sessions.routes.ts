import { Router } from "express";
import { celebrate } from "celebrate";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { RefreshTokenUserController } from "../controllers/RefreshTokenUserController";

import { sessionValidator } from "@modules/users/validator/SessionValidator";

const authenticateRouter = Router();
const authenticateController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

authenticateRouter.post("/", celebrate(sessionValidator), authenticateController.handle);
authenticateRouter.post("/refresh-token", refreshTokenUserController.handle);

export default authenticateRouter;
