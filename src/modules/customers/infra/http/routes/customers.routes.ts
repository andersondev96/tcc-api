
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ListCustomersByCompanyController } from "../controllers/ListCustomersByCompanyController";
import { ShowCustomerByUserController } from "../controllers/ShowCustomerByUserController";


const customersRoutes = Router();

const listCustomersByCompanyController = new ListCustomersByCompanyController();
const showCustomerByUserController = new ShowCustomerByUserController();

customersRoutes.get("/my-customer", ensureAuthenticated, showCustomerByUserController.handle);
customersRoutes.get("/:company_id", ensureAuthenticated, listCustomersByCompanyController.handle);

export default customersRoutes;