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

const createUserController = new CreateUsersController();
const findByUserIdController = new FindByUserIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateUserAvatarController = new UpdateUserAvatarController();

usersRouter.post("/", createUserController.handle);
usersRouter.get("/profile", ensureAuthenticated, findByUserIdController.handle);
usersRouter.delete("/", ensureAuthenticated, deleteUserController.handle);
usersRouter.put("/", ensureAuthenticated, updateUserController.handle);

usersRouter.patch(
    "/avatar",
    ensureAuthenticated,
    uploadAvatar.single("avatar"),
    updateUserAvatarController.handle
);

export default usersRouter;
