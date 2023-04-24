import { inject, injectable } from "tsyringe";

import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IResponse {
  user_id: string;
  objective?: string;
  description?: string;
  status?: string;
  company?: string;
}

@injectable()
export class ListAllProposalsService {

  constructor(
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute({ user_id, objective, description, status, company }: IResponse): Promise<Proposal[]> {

    const customer = await this.customerRepository.findCustomerByUser(user_id);

    if (!customer) {
      throw new AppError("User has not a customer");
    }

    let proposals = await this.proposalRepository.listProposalsByCustomer(customer.id);

    if (objective || description || status || company) {
      proposals = proposals.filter(prop =>
        prop.objective.includes(objective) ||
        prop.description.includes(description) ||
        prop.status.includes(status) ||
        prop.company.name.includes(company)
      );
    }


    return proposals;

  }
}