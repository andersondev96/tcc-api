import { celebrate } from "celebrate";
import { Router } from "express";

import { AssessmentValidator } from "@modules/assessments/validator/AssessmentValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateAssessmentsCompanyController } from "../controllers/CreateAssessmentsCompanyController";
import { CreateAssessmentsServicesController } from "../controllers/CreateAssessmentsServicesController";
import { FindAssessmentsByCompanyController } from "../controllers/FindAssessmentsByCompanyController";
import { FindAssessmentsByServicesController } from "../controllers/FindAssessmentsByServicesController";
import { UpdateAssessmentsByCompanyController } from "../controllers/UpdateAssessmentsByCompanyController";
import { UpdateAssessmentsByServicesController } from "../controllers/UpdateAssessmentsByServicesController";

const createAssessmentsCompanyController = new CreateAssessmentsCompanyController();
const createAssessmentsServicesController = new CreateAssessmentsServicesController();
const findAssessmentsByCompanyController = new FindAssessmentsByCompanyController();
const findAssessmentsByServicesController = new FindAssessmentsByServicesController();
const updateAssessmentsByCompanyController = new UpdateAssessmentsByCompanyController();
const updateAssessmentsByServicesController = new UpdateAssessmentsByServicesController();

const assessmentsRoute = Router();

assessmentsRoute.post("/company/:company_id", ensureAuthenticated, celebrate(AssessmentValidator), createAssessmentsCompanyController.handle);
assessmentsRoute.post("/service/:service_id", ensureAuthenticated, celebrate(AssessmentValidator), createAssessmentsServicesController.handle);
assessmentsRoute.get("/company/:company_id", ensureAuthenticated, findAssessmentsByCompanyController.handle);
assessmentsRoute.get("/service/:service_id", ensureAuthenticated, findAssessmentsByServicesController.handle);
assessmentsRoute.put("/company/:assessment_id", ensureAuthenticated, celebrate(AssessmentValidator), updateAssessmentsByCompanyController.handle);
assessmentsRoute.put("/service/:assessment_id", ensureAuthenticated, celebrate(AssessmentValidator), updateAssessmentsByServicesController.handle);

export default assessmentsRoute;