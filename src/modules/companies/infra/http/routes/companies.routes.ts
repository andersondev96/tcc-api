import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { FindByCompanyController } from "@modules/companies/infra/http/controllers/FindByCompanyController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateImageCompanyController } from "../controllers/CreateImageCompanyController";
import { DeleteCompanyController } from "../controllers/DeleteCompanyController";
import { DeleteImagesCompanyController } from "../controllers/DeleteImagesCompanyController";
import { DeleteScheduleController } from "../controllers/DeleteScheduleController";
import { ListAllCompaniesController } from "../controllers/ListAllCompaniesController";
import { UpdateCompanyController } from "../controllers/UpdateCompanyController";
import { UpdateImagesCompanyController } from "../controllers/UpdateImagesCompanyController";
import { UpdateScheduleController } from "../controllers/UpdateScheduleController";

const companiesRouter = Router();

const upload = multer(uploadConfig);

const createCompanyController = new CreateCompanyController();
const createImageCompanyController = new CreateImageCompanyController();
const findByCompanyController = new FindByCompanyController();
const listAllCompaniesController = new ListAllCompaniesController();
const updateCompanyController = new UpdateCompanyController();
const updateScheduleController = new UpdateScheduleController();
const updateImagesCompanyController = new UpdateImagesCompanyController();
const deleteCompanyController = new DeleteCompanyController();
const deleteScheduleController = new DeleteScheduleController();
const deleteImagesCompanyController = new DeleteImagesCompanyController();

companiesRouter.post('/', ensureAuthenticated, ensureEntrepreneur, createCompanyController.handle);
companiesRouter.post(
  '/images/:id',
  ensureAuthenticated,
  ensureEntrepreneur,
  upload.array("company"),
  createImageCompanyController.handle
);
companiesRouter.get('/:id', findByCompanyController.handle);
companiesRouter.get('/', listAllCompaniesController.handle);
companiesRouter.put('/:id', updateCompanyController.handle);
companiesRouter.put('/schedules/:id', ensureAuthenticated, ensureEntrepreneur, updateScheduleController.handle);
companiesRouter.delete('/schedules/:id', ensureAuthenticated, ensureEntrepreneur, deleteScheduleController.handle);
companiesRouter.put(
  '/images/:id',
  ensureAuthenticated,
  ensureEntrepreneur,
  upload.single("company"),
  updateImagesCompanyController.handle
);
companiesRouter.delete('/images/:id', ensureAuthenticated, ensureEntrepreneur, deleteImagesCompanyController.handle);
companiesRouter.delete('/:id', ensureAuthenticated, ensureEntrepreneur, deleteCompanyController.handle);

export default companiesRouter;
