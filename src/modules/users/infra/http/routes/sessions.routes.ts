import { Router } from "express";

import { AuthenticateUserController } from "../controllers/AuthenticateUserController";
import { RefreshTokenUserController } from "../controllers/RefreshTokenUserController";

const authenticateRouter = Router();
const authenticateController = new AuthenticateUserController();
const refreshTokenUserController = new RefreshTokenUserController();

authenticateRouter.post("/", authenticateController.handle);
authenticateRouter.post("/refresh-token", refreshTokenUserController.handle);

export default authenticateRouter;
