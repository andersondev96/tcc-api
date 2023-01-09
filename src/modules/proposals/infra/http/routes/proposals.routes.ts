
import { celebrate } from "celebrate";
import { Router } from "express";

import { ProposalValidator } from "@modules/proposals/validator/ProposalValidator";
import { ensureAuthenticated } from "@shared/infra/http/middlewares/ensureAuthenticated";

import { CreateProposalController } from "../controllers/CreateProposalController";
import { DeleteProposalController } from "../controllers/DeleteProposalController";
import { FindProposalByIdController } from "../controllers/FindProposalByIdController";
import { LinkServiceByProposalController } from "../controllers/LinkServiceByProposalController";
import { ListAllProposalsController } from "../controllers/ListAllProposalsController";
import { ListServicesByProposalController } from "../controllers/ListServicesByProposalController";
import { UnlinkServiceByProposalController } from "../controllers/UnlinkServiceByProposalController";
import { UpdateProposalController } from "../controllers/UpdateProposalController";
import { UpdateServiceByProposalController } from "../controllers/UpdateServiceByProposalController";

const proposalsRoutes = Router();

const createProposalController = new CreateProposalController();
const linkServiceByProposalController = new LinkServiceByProposalController();
const unlinkServiceByProposalController = new UnlinkServiceByProposalController();
const listAllProposalsController = new ListAllProposalsController();
const listServiceByProposalController = new ListServicesByProposalController();
const findProposalByIdController = new FindProposalByIdController();
const updateProposalController = new UpdateProposalController();
const updateServiceByProposalController = new UpdateServiceByProposalController();
const deleteProposalController = new DeleteProposalController();

proposalsRoutes.post("/:company_id", ensureAuthenticated, celebrate(ProposalValidator), createProposalController.handle);
proposalsRoutes.post("/link_service/:proposal_id", ensureAuthenticated, linkServiceByProposalController.handle);
proposalsRoutes.get("/", ensureAuthenticated, listAllProposalsController.handle);
proposalsRoutes.get("/:proposal_id", ensureAuthenticated, findProposalByIdController.handle);
proposalsRoutes.get("/services/:proposal_id", ensureAuthenticated, listServiceByProposalController.handle);
proposalsRoutes.put("/:proposal_id", ensureAuthenticated, celebrate(ProposalValidator), updateProposalController.handle);
proposalsRoutes.put(
  "/update_service_proposal/:service_proposal_id",
  ensureAuthenticated,
  updateServiceByProposalController.handle
);
proposalsRoutes.delete("/:proposal_id", ensureAuthenticated, deleteProposalController.handle);
proposalsRoutes.delete(
  "/unlink_service/:service_proposal_id",
  ensureAuthenticated,
  unlinkServiceByProposalController.handle
);

export default proposalsRoutes;