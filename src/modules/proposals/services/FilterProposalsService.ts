import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Proposal } from "../infra/prisma/entities/Proposal";
import { IProposalsRepository } from "../repositories/IProposalsRepository";

@injectable()
export class FilterProposalsService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("ProposalsRepository")
    private proposalRepository: IProposalsRepository
  ) { }

  public async execute(company_id: string, name?: string, objective?: string): Promise<Proposal[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const proposal = await this.proposalRepository.listProposalsByObjectiveOrName(company_id, objective, name);

    return proposal;
  }
}