import { celebrate } from "celebrate";
import { Router } from "express";

import { forgotPasswordValidator } from "@modules/users/validator/ForgotPasswordValidator";
import { resetPasswordValidator } from "@modules/users/validator/ResetPasswordValidator";

import { ResetUserPasswordController } from "../controllers/ResetUserPasswordController";
import { SendForgotPasswordMailController } from "../controllers/SendForgotPasswordMailController";

const passwordRoutes = Router();

const sendForgotPasswordMailController = new SendForgotPasswordMailController();
const resetUserPasswordController = new ResetUserPasswordController();

passwordRoutes.post("/forgot", celebrate(forgotPasswordValidator), sendForgotPasswordMailController.handle);
passwordRoutes.post("/reset", celebrate(resetPasswordValidator), resetUserPasswordController.handle);

export default passwordRoutes;
