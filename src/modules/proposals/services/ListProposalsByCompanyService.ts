import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

interface IRequest {
  company_id: string;
  objective?: string;
  description?: string;
  status?: string;
  name?: string;
}

@injectable()
export class ListProposalsByCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute({ company_id, objective, description, status, name }: IRequest): Promise<Proposal[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    let proposals = await this.proposalRepository.listProposalsByCompany(company_id);

    if (objective || description || status || name) {
      proposals = proposals.filter(prop =>
        prop.objective.includes(objective) ||
        prop.description.includes(description) ||
        prop.status.includes(status) ||
        prop.customer.user.name.includes(name)
      );
    }

    return proposals;
  }
}