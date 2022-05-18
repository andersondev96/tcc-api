import { Router } from "express";

import { CreateUsersController } from "../controllers/CreateUsersController";

const usersRouter = Router();
const createUserController = new CreateUsersController();

usersRouter.post("/", createUserController.handle);

export default usersRouter;
