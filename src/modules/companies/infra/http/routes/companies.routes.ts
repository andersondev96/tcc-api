import { Router } from "express";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateCompanyController } from "../controllers/CreateCompanyController";
import { CreateContactController } from "../controllers/CreateContactController";
import { CreateScheduleController } from "../controllers/CreateScheduleController";
import { CreateServiceOfferedController } from "../controllers/CreateServiceOfferedServiceController";

const companiesRouter = Router();

const createCompanyController = new CreateCompanyController();
const createContactController = new CreateContactController();
const createScheduleController = new CreateScheduleController();
const createServiceOfferedController = new CreateServiceOfferedController();

companiesRouter.use(ensureAuthenticated);

companiesRouter.post('/', createCompanyController.handle);
companiesRouter.post('/contact', createContactController.handle);
companiesRouter.post('/schedule', createScheduleController.handle);
companiesRouter.post('/service-offered', createServiceOfferedController.handle);

export default companiesRouter;
