import { Router } from "express";
import multer from "multer";

import config from "@config/upload";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateImageCompanyController } from "../controllers/CreateImageCompanyController";
import uploadConfig from "@config/upload";

const companiesRouter = Router();

const upload = multer(uploadConfig);

const createCompanyController = new CreateCompanyController();
const createImageCompanyController = new CreateImageCompanyController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.post('/', createCompanyController.handle);
companiesRouter.post(
    '/images/:id',
    upload.array("images"),
    createImageCompanyController.handle
);

export default companiesRouter;
