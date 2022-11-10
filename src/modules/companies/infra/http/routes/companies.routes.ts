import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateContactController } from "../controllers/CreateContactController";

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();
const createContactController = new CreateContactController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.post('/', createCompanyController.handle);
companiesRouter.post('/contact', createContactController.handle);

export default companiesRouter;
