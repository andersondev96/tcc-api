import { createServiceValidator } from "@modules/services/validators/CreateServiceValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { celebrate } from "celebrate";
import { Router } from "express";
import { CreateServiceController } from "../controllers/CreateServiceController";
import { FindServiceByNameController } from "../controllers/FindServiceByNameController";

const servicesRouter = Router();

servicesRouter.use(ensureAuthenticated);

const createServiceController = new CreateServiceController();
const findServiceByNameController = new FindServiceByNameController();


servicesRouter.post('/:company_id', celebrate(createServiceValidator), createServiceController.handle);
servicesRouter.get('/:company_id', findServiceByNameController.handle);

export default servicesRouter;