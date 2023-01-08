
import { Router } from "express";

import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateProposalController } from "../controllers/CreateProposalController";
import { DeleteProposalController } from "../controllers/DeleteProposalController";
import { FindProposalByIdController } from "../controllers/FindProposalByIdController";
import { LinkServiceByProposalController } from "../controllers/LinkServiceByProposalController";
import { ListAllProposalsController } from "../controllers/ListAllProposalsController";
import { UnlinkServiceByProposalController } from "../controllers/UnlinkServiceByProposalController";
import { UpdateProposalController } from "../controllers/UpdateProposalController";

const proposalsRoutes = Router();

const createProposalController = new CreateProposalController();
const linkServiceByProposalController = new LinkServiceByProposalController();
const unlinkServiceByProposalController = new UnlinkServiceByProposalController();
const listAllProposalsController = new ListAllProposalsController();
const findProposalByIdController = new FindProposalByIdController();
const updateProposalController = new UpdateProposalController();
const deleteProposalController = new DeleteProposalController();

proposalsRoutes.post("/:company_id", ensureAuthenticated, createProposalController.handle);
proposalsRoutes.post("/link_service/:proposal_id", ensureAuthenticated, linkServiceByProposalController.handle);
proposalsRoutes.get("/", ensureAuthenticated, listAllProposalsController.handle);
proposalsRoutes.get("/:proposal_id", ensureAuthenticated, findProposalByIdController.handle);
proposalsRoutes.put("/:proposal_id", ensureAuthenticated, updateProposalController.handle);
proposalsRoutes.delete("/:proposal_id", ensureAuthenticated, deleteProposalController.handle);
proposalsRoutes.delete(
  "/link_service/:service_proposal_id",
  ensureAuthenticated,
  unlinkServiceByProposalController.handle
);

export default proposalsRoutes;