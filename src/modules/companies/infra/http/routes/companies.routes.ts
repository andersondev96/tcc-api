import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCompanyController } from "../controllers/CreateCompanyController";

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.post('/', createCompanyController.handle);

export default companiesRouter;
