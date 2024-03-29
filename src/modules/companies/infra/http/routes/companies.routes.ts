import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { FindByCompanyController } from "@modules/companies/infra/http/controllers/FindByCompanyController";
import { companyValidator } from "@modules/companies/validator/CompanyValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { updateCompanyValidator } from "@modules/companies/validator/UpdateCompanyValidator";
import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateImageCompanyController } from "../controllers/CreateImageCompanyController";
import { DeleteCompanyController } from "../controllers/DeleteCompanyController";
import { DeleteImagesCompanyController } from "../controllers/DeleteImagesCompanyController";
import { DeleteScheduleController } from "../controllers/DeleteScheduleController";
import { FavoriteCompanyController } from "../controllers/FavoriteCompanyController";
import { FindCompanyByUserController } from "../controllers/FindCompanyByUserController";
import { ListAllCompaniesController } from "../controllers/ListAllCompaniesController";
import { UnfavoriteCompanyController } from "../controllers/UnfavoriteCompanyController";
import { UpdateCompanyController } from "../controllers/UpdateCompanyController";
import { UpdateImagesCompanyController } from "../controllers/UpdateImagesCompanyController";
import { UpdateScheduleController } from "../controllers/UpdateScheduleController";

const companiesRouter = Router();

const upload = multer(uploadConfig);

const createCompanyController = new CreateCompanyController();
const createImageCompanyController = new CreateImageCompanyController();
const findByCompanyController = new FindByCompanyController();
const findCompanyByUserController = new FindCompanyByUserController();
const listAllCompaniesController = new ListAllCompaniesController();
const favoriteCompanyController = new FavoriteCompanyController();
const unfavoriteCompanyController = new UnfavoriteCompanyController();
const updateCompanyController = new UpdateCompanyController();
const updateScheduleController = new UpdateScheduleController();
const updateImagesCompanyController = new UpdateImagesCompanyController();
const deleteCompanyController = new DeleteCompanyController();
const deleteScheduleController = new DeleteScheduleController();
const deleteImagesCompanyController = new DeleteImagesCompanyController();

companiesRouter.post(
  "/",
  ensureAuthenticated,
  ensureEntrepreneur,
  celebrate(companyValidator),
  createCompanyController.handle
);
companiesRouter.post(
  "/images/:id",
  ensureAuthenticated,
  ensureEntrepreneur,
  upload.array("company"),
  createImageCompanyController.handle
);
companiesRouter.get("/me", ensureAuthenticated, findCompanyByUserController.handle);
companiesRouter.get("/:id", findByCompanyController.handle);
companiesRouter.get("/", listAllCompaniesController.handle);
companiesRouter.put("/:id", celebrate(updateCompanyValidator), updateCompanyController.handle);
companiesRouter.put(
  "/schedules/:id",
  ensureAuthenticated,
  ensureEntrepreneur,
  updateScheduleController.handle
);
companiesRouter.patch(
  "/favorites/:company_id",
  ensureAuthenticated,
  favoriteCompanyController.handle
);
companiesRouter.patch(
  "/favorites/unfavorite/:company_id",
  ensureAuthenticated,
  unfavoriteCompanyController.handle
);
companiesRouter.delete(
  "/schedules/:id",
  ensureAuthenticated,
  ensureEntrepreneur,
  deleteScheduleController.handle
);
companiesRouter.put(
  "/images/:company_id",
  ensureAuthenticated,
  ensureEntrepreneur,
  upload.array("company"),
  updateImagesCompanyController.handle
);
companiesRouter.delete(
  "/images/:id",
  ensureAuthenticated,
  ensureEntrepreneur,
  deleteImagesCompanyController.handle
);
companiesRouter.delete(
  "/:id",
  ensureAuthenticated,
  ensureEntrepreneur,
  deleteCompanyController.handle
);

export default companiesRouter;
