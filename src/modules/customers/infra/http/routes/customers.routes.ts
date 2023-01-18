
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ListCustomersByCompanyController } from "../controllers/ListCustomersByCompanyController";


const customersRoutes = Router();

const listCustomersByCompanyController = new ListCustomersByCompanyController();

customersRoutes.get("/:company_id", ensureAuthenticated, listCustomersByCompanyController.handle);

export default customersRoutes;