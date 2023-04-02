import { Router } from "express";

import { UpdateEntrepreneursSettingsController } from "@modules/entrepreneurs/infra/http/controllers/UpdateEntrepreneursSettingsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ShowSettingEntrepreneurCompanyController } from "../controllers/ShowSettingEntrepreneurCompanyController";
import { ShowSettingEntrepreneurUserController } from "../controllers/ShowSettingEntrepreneurUserController";
const entrepreneursRoutes = Router();


const updateEntrepreneursSettingsController = new UpdateEntrepreneursSettingsController();
const showSettingEntrepreneurUserController = new ShowSettingEntrepreneurUserController();
const showSettingEntrepreneurCompanyController = new ShowSettingEntrepreneurCompanyController();

entrepreneursRoutes.put("/:entrepreneur_id/settings", ensureAuthenticated, updateEntrepreneursSettingsController.handle);
entrepreneursRoutes.get("/", ensureAuthenticated, showSettingEntrepreneurUserController.handle);
entrepreneursRoutes.get("/:company_id", showSettingEntrepreneurCompanyController.handle);

export default entrepreneursRoutes;