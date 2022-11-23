import { createServiceValidator } from "@modules/services/validators/CreateServiceValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { celebrate } from "celebrate";
import { Router } from "express";
import { CreateServiceController } from "../controllers/CreateServiceController";
import { FindServiceByCategoryController } from "../controllers/FindServiceByCategoryController";
import { FindServiceByNameController } from "../controllers/FindServiceByNameController";

const servicesRouter = Router();

servicesRouter.use(ensureAuthenticated);

const createServiceController = new CreateServiceController();
const findServiceByNameController = new FindServiceByNameController();
const findServiceByCategoryController = new FindServiceByCategoryController();


servicesRouter.post('/:company_id', celebrate(createServiceValidator), createServiceController.handle);
servicesRouter.get('/:company_id', findServiceByNameController.handle);
servicesRouter.get('/category/:company_id', findServiceByCategoryController.handle);


export default servicesRouter;