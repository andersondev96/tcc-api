import { celebrate } from "celebrate";
import { Router } from "express";

import { CategoryValidator } from "@modules/categories/validator/CategoryValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateCategoryController } from "../controllers/CreateCategoryController";

const categoriesRoutes = Router();

const createCategoryController = new CreateCategoryController();


categoriesRoutes.post("/", ensureAuthenticated, ensureEntrepreneur, celebrate(CategoryValidator), createCategoryController.handle);

export default categoriesRoutes;