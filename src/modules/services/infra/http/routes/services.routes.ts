import { createServiceValidator } from "@modules/services/validators/CreateServiceValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { celebrate } from "celebrate";
import { Router } from "express";
import { CreateServiceController } from "../controllers/CreateServiceController";

const servicesRouter = Router();

servicesRouter.use(ensureAuthenticated);

const createServiceController = new CreateServiceController();


servicesRouter.post('/:company_id', celebrate(createServiceValidator), createServiceController.handle);

export default servicesRouter;