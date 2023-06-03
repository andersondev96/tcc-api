import { inject, injectable } from "tsyringe";

import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { ServiceProposal } from "../infra/prisma/entities/ServiceProposal";
import { IServicesProposalsRepository } from "../repositories/IServicesProposalsRepository";

interface IRequest {
  service_proposal_id: string;
  service_id: string;
}

@injectable()
export class UpdateServiceByProposalService {

  constructor(
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,
    @inject("ServicesProposalsRepository")
    private serviceProposalRepository: IServicesProposalsRepository
  ) { }

  public async execute({ service_proposal_id, service_id }: IRequest): Promise<ServiceProposal> {

    const serviceProposalExists = await this.serviceProposalRepository.listServicesProposalById(service_proposal_id);

    if (!serviceProposalExists) {
      throw new AppError("Service proposal not found");
    }

    const service = await this.serviceRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    const serviceProposal = await this.serviceProposalRepository.update({
      id: serviceProposalExists.id,
      customer_id: serviceProposalExists.customer_id,
      proposal_id: serviceProposalExists.proposal_id,
      service_id
    });

    return serviceProposal;
  }
}