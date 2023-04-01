import { Router } from "express";

import { UpdateEntrepreneursSettingsController } from "@modules/entrepreneurs/infra/http/controllers/UpdateEntrepreneursSettingsController";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ShowSettingEntrepreneurCompanyController } from "../controllers/ShowSettingEntrepreneurCompanyController";
const entrepreneursRoutes = Router();


const updateEntrepreneursSettingsController = new UpdateEntrepreneursSettingsController();
const showSettingEntrepreneurCompanyController = new ShowSettingEntrepreneurCompanyController();

entrepreneursRoutes.put("/:entrepreneur_id/settings", ensureAuthenticated, updateEntrepreneursSettingsController.handle);
entrepreneursRoutes.get("/:company_id", showSettingEntrepreneurCompanyController.handle);

export default entrepreneursRoutes;