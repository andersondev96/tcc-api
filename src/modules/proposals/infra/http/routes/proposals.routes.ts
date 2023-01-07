
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateProposalController } from "../controllers/CreateProposalController";
import { ListAllProposalsController } from "../controllers/ListAllProposalsController";

const proposalsRoutes = Router();

const createProposalController = new CreateProposalController();
const listAllProposalsController = new ListAllProposalsController();

proposalsRoutes.post("/:company_id", ensureAuthenticated, createProposalController.handle);
proposalsRoutes.get("/", ensureAuthenticated, listAllProposalsController.handle);

export default proposalsRoutes;