import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { FindUserByEntrepreneurController } from "@modules/entrepreneurs/infra/http/controllers/FindUserByEntrepreneurController";
import { userValidator } from "@modules/users/validator/UserValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { updateUserValidator } from "@modules/users/validator/UpdateUserValidator";
import { CreateUsersController } from "../controllers/CreateUsersController";
import { DeleteUserController } from "../controllers/DeleteUserController";
import { FindByUserIdController } from "../controllers/FindByUserIdController";
import { FindFavoriteController } from "../controllers/FindFavoriteController";
import { FindUserByEmailController } from "../controllers/FindUserByEmailController";
import { ListFavoritesController } from "../controllers/ListFavoritesController";
import { UpdateUserAvatarController } from "../controllers/UpdateUserAvatarController";
import { UpdateUserController } from "../controllers/UpdateUserController";
const usersRouter = Router();
const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUsersController();
const findUserByEmailController = new FindUserByEmailController();
const findByUserIdController = new FindByUserIdController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const findUserByEntrepreneurController = new FindUserByEntrepreneurController();
const listFavoritesController = new ListFavoritesController();
const findFavoriteController = new FindFavoriteController();

usersRouter.post("/", celebrate(userValidator), createUserController.handle);
usersRouter.get("/email", findUserByEmailController.handle);
usersRouter.get("/profile", ensureAuthenticated, findByUserIdController.handle);
usersRouter.get("/entrepreneur", ensureAuthenticated, findUserByEntrepreneurController.handle);
usersRouter.get("/favorites", ensureAuthenticated, listFavoritesController.handle);
usersRouter.get("/favorite/:table_id", ensureAuthenticated, findFavoriteController.handle);
usersRouter.delete("/", ensureAuthenticated, deleteUserController.handle);
usersRouter.put("/", ensureAuthenticated, celebrate(updateUserValidator), updateUserController.handle);
usersRouter.patch(
  "/avatar",
  ensureAuthenticated,
  uploadAvatar.single("avatar"),
  updateUserAvatarController.handle
);
export default usersRouter;
