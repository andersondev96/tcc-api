import { v4 as uuid } from "uuid";

import { ICreateServiceProposalDTO } from "@modules/proposals/dtos/ICreateServiceProposalDTO";
import { ServiceProposal } from "@modules/proposals/infra/prisma/entities/ServiceProposal";

import { IServicesProposalsRepository } from "../IServicesProposalsRepository";

export class FakeServicesProposalsRepository implements IServicesProposalsRepository {

  servicesProposals: ServiceProposal[] = [];

  public async create(data: ICreateServiceProposalDTO): Promise<ServiceProposal> {
    Object.assign(data, {
      id: uuid()
    });

    this.servicesProposals.push(data);

    return data;
  }

  public async listServicesByProposal(proposal_id: string): Promise<ServiceProposal[]> {
    const listAll = this.servicesProposals.filter(serviceProposal => serviceProposal.proposal_id === proposal_id);

    return listAll;
  }

  public async listServicesProposalById(id: string): Promise<ServiceProposal> {
    const listServiceProposal = this.servicesProposals.find((serviceProposal) => serviceProposal.id === id);

    return listServiceProposal;
  }

  public async update(data: ICreateServiceProposalDTO): Promise<ServiceProposal> {
    const index = this.servicesProposals.findIndex(serviceProposal => serviceProposal.id === data.id);

    this.servicesProposals[index] = data;

    return data;
  }

  public async delete(id: string): Promise<void> {
    const index = this.servicesProposals.findIndex(serviceProposal => serviceProposal.id === id);

    this.servicesProposals.splice(index, 1);
  }

}