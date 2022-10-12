import { Router } from "express";

import { CreateUsersController } from "../controllers/CreateUsersController";
import { FindByUserIdController } from "../controllers/FindByUserIdController";

const usersRouter = Router();
const createUserController = new CreateUsersController();
const findByUserIdController = new FindByUserIdController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/:user_id", findByUserIdController.handle);

export default usersRouter;
