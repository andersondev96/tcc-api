import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateAssessmentsCompanyController } from "../controllers/CreateAssessmentsCompanyController";
import { FindAssessmentsByCompanyController } from "../controllers/FindAssessmentsByCompanyController";
import { UpdateAssessmentsByCompanyController } from "../controllers/UpdateAssessmentsByCompanyController";

const createAssessmentsCompanyController = new CreateAssessmentsCompanyController();
const findAssessmentsByCompanyController = new FindAssessmentsByCompanyController();
const updateAssessmentsByCompanyController = new UpdateAssessmentsByCompanyController();

const assessmentsRoute = Router();

assessmentsRoute.post("/company/:company_id", ensureAuthenticated, createAssessmentsCompanyController.handle);
assessmentsRoute.get("/company/:company_id", ensureAuthenticated, findAssessmentsByCompanyController.handle);
assessmentsRoute.put("/company/:assessment_id", ensureAuthenticated, updateAssessmentsByCompanyController.handle);

export default assessmentsRoute;