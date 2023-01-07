
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateProposalController } from "../controllers/CreateProposalController";
import { FindProposalByIdController } from "../controllers/FindProposalByIdController";
import { ListAllProposalsController } from "../controllers/ListAllProposalsController";

const proposalsRoutes = Router();

const createProposalController = new CreateProposalController();
const listAllProposalsController = new ListAllProposalsController();
const findProposalByIdController = new FindProposalByIdController();

proposalsRoutes.post("/:company_id", ensureAuthenticated, createProposalController.handle);
proposalsRoutes.get("/", ensureAuthenticated, listAllProposalsController.handle);
proposalsRoutes.get("/:proposal_id", ensureAuthenticated, findProposalByIdController.handle);

export default proposalsRoutes;