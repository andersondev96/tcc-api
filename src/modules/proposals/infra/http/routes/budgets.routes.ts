
import { celebrate } from "celebrate";
import { Router } from "express";

import { BudgetValidator } from "@modules/proposals/validator/BudgetValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateBudgetController } from "../controllers/CreateBudgetController";
import { UpdateBudgetController } from "../controllers/UpdateBudgetController";

const budgetsRoutes = Router();

const createBudgetController = new CreateBudgetController();
const updateBudgetController = new UpdateBudgetController();

budgetsRoutes.post("/:proposal_id", ensureAuthenticated, celebrate(BudgetValidator), createBudgetController.handle);
budgetsRoutes.put("/:proposed_id", ensureAuthenticated, celebrate(BudgetValidator), updateBudgetController.handle);

export default budgetsRoutes;