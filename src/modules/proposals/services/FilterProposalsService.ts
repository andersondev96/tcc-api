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

  public async execute(company_id: string, page: number, perPage: number, name?: string, objective?: string): Promise<{ proposals: Proposal[], totalResults: number }> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const proposals = await this.proposalRepository.listProposalsByObjectiveOrName(company_id, objective, name);

    console.log(proposals);
    console.log(page, perPage);

    const totalResults = proposals.length;
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const proposalsByPage = proposals.slice(start, end);

    return { proposals: proposalsByPage, totalResults };
  }
}