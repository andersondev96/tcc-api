
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateBudgetController } from "../controllers/CreateBudgetController";

const budgetsRoutes = Router();

const createBudgetController = new CreateBudgetController();

budgetsRoutes.post("/:proposal_id", ensureAuthenticated, createBudgetController.handle);

export default budgetsRoutes;