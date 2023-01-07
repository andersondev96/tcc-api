
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateProposalController } from "../controllers/CreateProposalController";

const proposalsRoutes = Router();

const createProposalController = new CreateProposalController();

proposalsRoutes.post("/:company_id", ensureAuthenticated, createProposalController.handle);

export default proposalsRoutes;