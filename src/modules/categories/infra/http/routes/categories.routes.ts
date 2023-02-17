import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import { CategoryValidator } from "@modules/categories/validator/CategoryValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateCategoryController } from "../controllers/CreateCategoryController";
import { ImportCategoryController } from "../controllers/ImportCategoryController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();


categoriesRoutes.post("/", ensureAuthenticated, ensureEntrepreneur, celebrate(CategoryValidator), createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  importCategoryController.handle
);

export default categoriesRoutes;