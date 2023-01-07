import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  objective: string;
  time?: Date;
  description?: string;
  telephone?: string;
  company_id: string;
  user_id: string;
}

@injectable()
export class CreateProposalService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CustomersRepository")
    private customerRepository: ICustomersRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute({ objective, time, description, telephone, company_id, user_id }: IRequest): Promise<Proposal> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const user = await this.usersRepository.findById(user_id);

    if (user) {
      const customer = await this.customerRepository.findCustomerByUser(user.id);

      if (!customer) {
        await this.customerRepository.create({
          user_id,
          telephone,
          status: "negotiation"
        });
      }

      const proposal = await this.proposalRepository.create({
        objective,
        time,
        description,
        company_id,
        customer_id: customer.id
      });

      return proposal;
    }

  }
}