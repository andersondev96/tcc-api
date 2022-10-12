import { Router } from "express";

import { CreateUsersController } from "../controllers/CreateUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { FindByUserIdController } from "../controllers/FindByUserIdController";

const usersRouter = Router();
const createUserController = new CreateUsersController();
const findByUserIdController = new FindByUserIdController();
const deleteUserController = new DeleteUserController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/:user_id", findByUserIdController.handle);
usersRouter.delete("/remove/:user_id", deleteUserController.handle);

export default usersRouter;
