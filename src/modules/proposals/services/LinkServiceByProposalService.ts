import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { ServiceProposal } from "../infra/prisma/entities/ServiceProposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { IServicesProposalsRepository } from "../repositories/IServicesProposalsRepository";


@injectable()
export class LinkServiceByProposalService {

  constructor(
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository,
    @inject("ServicesProposalsRepository")
    private serviceProposalRepository: IServicesProposalsRepository
  ) { }

  public async execute(
    service_id: string,
    proposal_id: string,
    customer_id: string
  ): Promise<ServiceProposal> {
    const customer = await this.customerRepository.findCustomerById(customer_id);

    if (!customer) {
      throw new AppError("Customer not found");
    }

    const service = await this.serviceRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    const proposal = await this.proposalRepository.findProposalById(proposal_id);

    if (!proposal) {
      throw new AppError("Proposal not found");
    }

    const serviceProposal = await this.serviceProposalRepository.create({
      service_id,
      proposal_id,
      customer_id
    });

    return serviceProposal;
  }
}