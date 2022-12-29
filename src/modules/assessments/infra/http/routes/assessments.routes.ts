import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateAssessmentsCompanyController } from "../controllers/CreateAssessmentsCompanyController";

const createAssessmentsCompanyController = new CreateAssessmentsCompanyController();

const assessmentsRoute = Router();

assessmentsRoute.post("/:company_id", ensureAuthenticated, createAssessmentsCompanyController.handle);

export default assessmentsRoute;