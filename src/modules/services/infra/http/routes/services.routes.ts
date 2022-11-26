import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { createServiceValidator } from "@modules/services/validators/CreateServiceValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateServiceController } from "../controllers/CreateServiceController";
import { DeleteServiceController } from "../controllers/DeleteServiceController";
import { FindServiceByCategoryController } from "../controllers/FindServiceByCategoryController";
import { FindServiceByNameController } from "../controllers/FindServiceByNameController";
import { GetFavoritesController } from "../controllers/GetFavoritesController";
import { GetServiceHighlightController } from "../controllers/GetServiceHighlightController";
import { UpdateServiceController } from "../controllers/UpdateServiceController";
import { UpdateServiceImageController } from "../controllers/UpdateServiceImageController";

const servicesRouter = Router();
const uploadImage = multer(uploadConfig);

const createServiceController = new CreateServiceController();
const findServiceByNameController = new FindServiceByNameController();
const findServiceByCategoryController = new FindServiceByCategoryController();
const updateServiceImageController = new UpdateServiceImageController();
const updateServiceController = new UpdateServiceController();
const deleteServiceController = new DeleteServiceController();
const getServiceHighlightController = new GetServiceHighlightController();
const getFavoritesController = new GetFavoritesController();


servicesRouter.post(
  "/:company_id",
  ensureAuthenticated,
  ensureEntrepreneur,
  celebrate(createServiceValidator),
  createServiceController.handle
);
servicesRouter.get("/:company_id", findServiceByNameController.handle);
servicesRouter.get("/category/:company_id", findServiceByCategoryController.handle);
servicesRouter.patch(
  "/image/:service_id",
  ensureAuthenticated,
  ensureEntrepreneur,
  uploadImage.single("service"),
  updateServiceImageController.handle
);
servicesRouter.patch("/:service_id", ensureAuthenticated, ensureEntrepreneur, getServiceHighlightController.handle);
servicesRouter.patch("/favorites/:service_id", ensureAuthenticated, getFavoritesController.handle);
servicesRouter.put(
  "/:service_id",
  ensureAuthenticated,
  ensureEntrepreneur,
  celebrate(createServiceValidator),
  updateServiceController.handle
);
servicesRouter.delete("/:service_id", ensureAuthenticated, ensureEntrepreneur, deleteServiceController.handle);

export default servicesRouter;