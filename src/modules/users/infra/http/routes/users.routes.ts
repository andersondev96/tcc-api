import { Router } from "express";

import { CreateUsersController } from "../controllers/CreateUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { FindByUserIdController } from "../controllers/FindByUserIdController";
import { UpdateUserController } from "../controllers/UpdateUserController";

const usersRouter = Router();
const createUserController = new CreateUsersController();
const findByUserIdController = new FindByUserIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/:user_id", findByUserIdController.handle);
usersRouter.delete("/remove/:user_id", deleteUserController.handle);
usersRouter.put("/:id", updateUserController.handle);

export default usersRouter;
