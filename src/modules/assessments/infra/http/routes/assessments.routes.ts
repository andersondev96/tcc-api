import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateAssessmentsCompanyController } from "../controllers/CreateAssessmentsCompanyController";
import { FindAssessmentsByCompanyController } from "../controllers/FindAssessmentsByCompanyController";

const createAssessmentsCompanyController = new CreateAssessmentsCompanyController();
const findAssessmentsByCompanyController = new FindAssessmentsByCompanyController();

const assessmentsRoute = Router();

assessmentsRoute.post("/company/:company_id", ensureAuthenticated, createAssessmentsCompanyController.handle);
assessmentsRoute.get("/company/:company_id", ensureAuthenticated, findAssessmentsByCompanyController.handle);

export default assessmentsRoute;