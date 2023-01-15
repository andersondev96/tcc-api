
import { celebrate } from "celebrate";
import { Router } from "express";
import multer from "multer";

import uploadConfig from "@config/upload";
import { BudgetValidator } from "@modules/proposals/validator/BudgetValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateBudgetController } from "../controllers/CreateBudgetController";
import { UpdateBudgetController } from "../controllers/UpdateBudgetController";
import { UploadFilesToBudgetController } from "../controllers/UploadFilesToBudgetController";

const upload = multer(uploadConfig);

const budgetsRoutes = Router();


const createBudgetController = new CreateBudgetController();
const updateBudgetController = new UpdateBudgetController();
const uploadFilesToBudgetController = new UploadFilesToBudgetController();

budgetsRoutes.post("/:proposal_id", ensureAuthenticated, celebrate(BudgetValidator), createBudgetController.handle);
budgetsRoutes.put("/:budget_id", ensureAuthenticated, celebrate(BudgetValidator), updateBudgetController.handle);
budgetsRoutes.patch("/:budget_id", ensureAuthenticated, upload.array("budget"), uploadFilesToBudgetController.handle);

export default budgetsRoutes;