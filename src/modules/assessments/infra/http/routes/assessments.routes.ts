import { celebrate } from "celebrate";
import { Router } from "express";

import { AssessmentValidator } from "@modules/assessments/validator/AssessmentValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateAssessmentsCompanyController } from "../controllers/CreateAssessmentsCompanyController";
import { FindAssessmentsByCompanyController } from "../controllers/FindAssessmentsByCompanyController";
import { UpdateAssessmentsByCompanyController } from "../controllers/UpdateAssessmentsByCompanyController";

const createAssessmentsCompanyController = new CreateAssessmentsCompanyController();
const findAssessmentsByCompanyController = new FindAssessmentsByCompanyController();
const updateAssessmentsByCompanyController = new UpdateAssessmentsByCompanyController();

const assessmentsRoute = Router();

assessmentsRoute.post("/company/:company_id", ensureAuthenticated, celebrate(AssessmentValidator), createAssessmentsCompanyController.handle);
assessmentsRoute.get("/company/:company_id", ensureAuthenticated, findAssessmentsByCompanyController.handle);
assessmentsRoute.put("/company/:assessment_id", ensureAuthenticated, celebrate(AssessmentValidator), updateAssessmentsByCompanyController.handle);

export default assessmentsRoute;