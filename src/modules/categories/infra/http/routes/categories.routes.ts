import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import { CategoryValidator } from "@modules/categories/validator/CategoryValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateCategoryController } from "../controllers/CreateCategoryController";
import { ImportCategoryController } from "../controllers/ImportCategoryController";
import { ListAllCategoriesController } from "../controllers/ListAllCategoriesController";
import { ListSubcategoriesToCategoriesController } from "../controllers/ListSubcategoriesToCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listAllCategoriesController = new ListAllCategoriesController();
const listSubcategoriesToCategoriesController = new ListSubcategoriesToCategoriesController();


categoriesRoutes.post("/", ensureAuthenticated, ensureEntrepreneur, celebrate(CategoryValidator), createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  importCategoryController.handle
);
categoriesRoutes.get("/", ensureAuthenticated, listAllCategoriesController.handle);
categoriesRoutes.get(
  "/list-subcategories/:category_id",
  ensureAuthenticated,
  listSubcategoriesToCategoriesController.handle
);


export default categoriesRoutes;