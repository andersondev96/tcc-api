import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { CreateUsersController } from "../controllers/CreateUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { FindByUserIdController } from "../controllers/FindByUserIdController";
import { UpdateUserController } from "../controllers/UpdateUserController";
import { UpdateUserAvatarController } from "../controllers/UpdateUserAvatarController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

usersRouter.use(ensureAuthenticated);

const createUserController = new CreateUsersController();
const findByUserIdController = new FindByUserIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/:user_id", findByUserIdController.handle);
usersRouter.delete("/remove/:user_id", deleteUserController.handle);
usersRouter.put("/:id", updateUserController.handle);

usersRouter.patch(
    "/:user_id/avatar",
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export default usersRouter;
