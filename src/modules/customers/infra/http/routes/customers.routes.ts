
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { ListCustomersByNameController } from "../controllers/ListCustomerByNameController";
import { ListCustomersByCompanyController } from "../controllers/ListCustomersByCompanyController";
import { ShowCustomerByUserController } from "../controllers/ShowCustomerByUserController";


const customersRoutes = Router();

const listCustomersByCompanyController = new ListCustomersByCompanyController();
const showCustomerByUserController = new ShowCustomerByUserController();
const listCustomerByNameController = new ListCustomersByNameController();

customersRoutes.get("/my-customer", ensureAuthenticated, showCustomerByUserController.handle);
customersRoutes.get("/:company_id", ensureAuthenticated, listCustomersByCompanyController.handle);
customersRoutes.get("/:company_id/filter", ensureAuthenticated, listCustomerByNameController.handle);

export default customersRoutes;