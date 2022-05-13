import { Router } from "express";

import { CreateUserController } from "../controllers/CreateUserController";

const usersRouter = Router();
const createUserController = new CreateUserController();

usersRouter.post("/", createUserController.handle);

export default usersRouter;
