import { createServiceValidator } from "@modules/services/validators/CreateServiceValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { celebrate } from "celebrate";
import { Router } from "express";
import { CreateServiceController } from "../controllers/CreateServiceController";
import { FindServiceByCategoryController } from "../controllers/FindServiceByCategoryController";
import { FindServiceByNameController } from "../controllers/FindServiceByNameController";

import uploadConfig from "@config/upload";
import multer from "multer";
import { UpdateServiceImageController } from "../controllers/UpdateServiceImageController";
import { UpdateServiceController } from "../controllers/UpdateServiceController";

const servicesRouter = Router();
const uploadImage = multer(uploadConfig);

servicesRouter.use(ensureAuthenticated);

const createServiceController = new CreateServiceController();
const findServiceByNameController = new FindServiceByNameController();
const findServiceByCategoryController = new FindServiceByCategoryController();
const updateServiceImageController = new UpdateServiceImageController();
const updateServiceController = new UpdateServiceController();


servicesRouter.post('/:company_id', celebrate(createServiceValidator), createServiceController.handle);
servicesRouter.get('/:company_id', findServiceByNameController.handle);
servicesRouter.get('/category/:company_id', findServiceByCategoryController.handle);
servicesRouter.patch(
    '/image/:service_id',
    uploadImage.single("service"),
    updateServiceImageController.handle
);
servicesRouter.put("/:service_id", updateServiceController.handle);


export default servicesRouter;