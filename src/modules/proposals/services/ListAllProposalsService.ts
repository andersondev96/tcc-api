import { inject, injectable } from "tsyringe";

import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class ListAllProposalsService {

  constructor(
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute(user_id: string): Promise<Proposal[]> {

    const customer = await this.customerRepository.findCustomerByUser(user_id);

    const proposals = await this.proposalRepository.listProposals(customer.id);

    return proposals;

  }
}