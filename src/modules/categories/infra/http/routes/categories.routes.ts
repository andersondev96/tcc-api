import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import { CategoryValidator } from "@modules/categories/validator/CategoryValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateCategoryController } from "../controllers/CreateCategoryController";
import { ImportCategoryController } from "../controllers/ImportCategoryController";
import { ListAllCategoriesController } from "../controllers/ListAllCategoriesController";
import { ListCategoryByIdController } from "../controllers/ListCategoryByIdController";
import { ListCategoryByNameController } from "../controllers/ListCategoryByNameController";
import { ListSubcategoriesToCategoriesController } from "../controllers/ListSubcategoriesToCategoriesController";

const categoriesRoutes = Router();

const upload = multer({
  dest: "./tmp"
});

const createCategoryController = new CreateCategoryController();
const importCategoryController = new ImportCategoryController();
const listCategoryByIdController = new ListCategoryByIdController();
const listAllCategoriesController = new ListAllCategoriesController();
const listCategoryByNameController = new ListCategoryByNameController();
const listSubcategoriesToCategoriesController = new ListSubcategoriesToCategoriesController();


categoriesRoutes.post("/", ensureAuthenticated, ensureEntrepreneur, celebrate(CategoryValidator), createCategoryController.handle);
categoriesRoutes.post(
  "/import",
  upload.single("file"),
  ensureAuthenticated,
  importCategoryController.handle
);
categoriesRoutes.get("/", ensureAuthenticated, listAllCategoriesController.handle);
categoriesRoutes.get("/:category_id", listCategoryByIdController.handle);
categoriesRoutes.get("/by-name", ensureAuthenticated, listCategoryByNameController.handle);
categoriesRoutes.get(
  "/list-subcategories/:category_id",
  ensureAuthenticated,
  listSubcategoriesToCategoriesController.handle
);


export default categoriesRoutes;