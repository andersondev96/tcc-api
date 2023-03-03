import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { createServiceValidator } from "@modules/services/validators/CreateServiceValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { CreateServiceController } from "../controllers/CreateServiceController";
import { DeleteServiceController } from "../controllers/DeleteServiceController";
import { FindServiceByCompanyController } from "../controllers/FindServiceByCompanyController";
import { GetFavoritesController } from "../controllers/GetFavoritesController";
import { GetServiceHighlightController } from "../controllers/GetServiceHighlightController";
import { ImportServiceController } from "../controllers/ImportServiceController";
import { ShowServiceController } from "../controllers/ShowServiceController";
import { UpdateServiceController } from "../controllers/UpdateServiceController";
import { UpdateServiceImageController } from "../controllers/UpdateServiceImageController";

const servicesRouter = Router();
const uploadImage = multer(uploadConfig);

const createServiceController = new CreateServiceController();
const importServiceController = new ImportServiceController();
const showServiceController = new ShowServiceController();
const findServiceByCompanyController = new FindServiceByCompanyController();
const updateServiceImageController = new UpdateServiceImageController();
const updateServiceController = new UpdateServiceController();
const deleteServiceController = new DeleteServiceController();
const getServiceHighlightController = new GetServiceHighlightController();
const getFavoritesController = new GetFavoritesController();

const upload = multer({
  dest: "./tmp"
});

servicesRouter.post(
  "/:company_id",
  ensureAuthenticated,
  ensureEntrepreneur,
  celebrate(createServiceValidator),
  createServiceController.handle
);
servicesRouter.post(
  "/import/:company_id",
  upload.single("file"),
  ensureAuthenticated,
  ensureAuthenticated,
  importServiceController.handle
);
servicesRouter.get("/:service_id", showServiceController.handle);
servicesRouter.get("/company/:company_id", findServiceByCompanyController.handle);
servicesRouter.patch(
  "/service/:service_id",
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