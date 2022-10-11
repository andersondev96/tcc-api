import { Router } from "express";
import { ResetUserPasswordController } from "../controllers/ResetUserPasswordController";

import { SendForgotPasswordMailController } from "../controllers/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", resetUserPasswordController.handle);

export { passwordRoutes };
