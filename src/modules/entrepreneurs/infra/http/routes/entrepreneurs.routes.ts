import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { UpdateEntrepreneursSettingsController } from "@modules/entrepreneurs/infra/http/controllers/UpdateEntrepreneursSettingsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";
import { ensureEntrepreneur } from "@shared/infra/http/middlewares/ensureEntrepreneur";

import { ShowSettingEntrepreneurCompanyController } from "../controllers/ShowSettingEntrepreneurCompanyController";
import { ShowSettingEntrepreneurUserController } from "../controllers/ShowSettingEntrepreneurUserController";
import { UploadImageLogoCompanyEntrepreneurController } from "../controllers/UploadImageLogoCompanyEntrepreneurController";
const entrepreneursRoutes = Router();

const updateEntrepreneursSettingsController = new UpdateEntrepreneursSettingsController();
const showSettingEntrepreneurUserController = new ShowSettingEntrepreneurUserController();
const showSettingEntrepreneurCompanyController = new ShowSettingEntrepreneurCompanyController();
const uploadImageLogoCompanyEntrepreneurController = new UploadImageLogoCompanyEntrepreneurController();

const uploadImage = multer(uploadConfig);

entrepreneursRoutes.put("/:entrepreneur_id/settings", ensureAuthenticated, updateEntrepreneursSettingsController.handle);
entrepreneursRoutes.get("/", ensureAuthenticated, showSettingEntrepreneurUserController.handle);
entrepreneursRoutes.get("/:company_id", showSettingEntrepreneurCompanyController.handle);
entrepreneursRoutes.patch(
  "/upload-logo/:entrepreneur_id",
  ensureAuthenticated,
  ensureEntrepreneur,
  uploadImage.single("company_logo"),
  uploadImageLogoCompanyEntrepreneurController.handle
);

export default entrepreneursRoutes;