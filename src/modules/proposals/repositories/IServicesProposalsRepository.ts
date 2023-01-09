import { ICreateServiceProposalDTO } from "../dtos/ICreateServiceProposalDTO";
import { ServiceProposal } from "../infra/prisma/entities/ServiceProposal";

export interface IServicesProposalsRepository {

  create(data: ICreateServiceProposalDTO): Promise<ServiceProposal>;

  listServicesByProposal(proposal_id: string): Promise<ServiceProposal[]>;

  listServicesProposalById(id: string): Promise<ServiceProposal>;

  update(data: ICreateServiceProposalDTO): Promise<ServiceProposal>;

  delete(id: string): Promise<void>;
}