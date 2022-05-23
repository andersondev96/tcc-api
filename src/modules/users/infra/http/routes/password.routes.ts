import { Router } from "express";

import { SendForgotPasswordMailController } from "../controllers/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();

passwordRoutes.post("/forgot", sendForgotPasswordMailController.handle);

export { passwordRoutes };
