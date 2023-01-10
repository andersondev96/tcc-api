
import { celebrate } from "celebrate";
import { Router } from "express";

import { BudgetValidator } from "@modules/proposals/validator/BudgetValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateBudgetController } from "../controllers/CreateBudgetController";

const budgetsRoutes = Router();

const createBudgetController = new CreateBudgetController();

budgetsRoutes.post("/:proposal_id", ensureAuthenticated, celebrate(BudgetValidator), createBudgetController.handle);

export default budgetsRoutes;