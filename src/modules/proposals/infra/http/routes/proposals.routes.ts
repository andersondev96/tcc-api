
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateProposalController } from "../controllers/CreateProposalController";
import { FindProposalByIdController } from "../controllers/FindProposalByIdController";
import { ListAllProposalsController } from "../controllers/ListAllProposalsController";
import { UpdateProposalController } from "../controllers/UpdateProposalController";

const proposalsRoutes = Router();

const createProposalController = new CreateProposalController();
const listAllProposalsController = new ListAllProposalsController();
const findProposalByIdController = new FindProposalByIdController();
const updateProposalController = new UpdateProposalController();

proposalsRoutes.post("/:company_id", ensureAuthenticated, createProposalController.handle);
proposalsRoutes.get("/", ensureAuthenticated, listAllProposalsController.handle);
proposalsRoutes.get("/:proposal_id", ensureAuthenticated, findProposalByIdController.handle);
proposalsRoutes.put("/:proposal_id", ensureAuthenticated, updateProposalController.handle);

export default proposalsRoutes;