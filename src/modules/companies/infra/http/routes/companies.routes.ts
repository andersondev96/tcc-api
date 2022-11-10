import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateContactController } from "../controllers/CreateContactController";
import { CreateScheduleController } from "../controllers/CreateScheduleController";

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();
const createContactController = new CreateContactController();
const createScheduleController = new CreateScheduleController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.post('/', createCompanyController.handle);
companiesRouter.post('/contact', createContactController.handle);
companiesRouter.post('/schedule', createScheduleController.handle);

export default companiesRouter;
