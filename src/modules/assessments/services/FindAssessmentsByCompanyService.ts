import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { AssessmentCompany } from "../infra/prisma/entities/AssessmentCompany";
import { IAssessmentsCompanyRepository } from "../repositories/IAssessmentsCompanyRepository";

@injectable()
export class FindAssessmentsByCompanyService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentCompanyRepository: IAssessmentsCompanyRepository,

    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository
  ) { }

  public async execute(company_id: string): Promise<AssessmentCompany[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const assessments = await this.assessmentCompanyRepository.findAssessmentsByCompany(company_id);

    return assessments;
  }
}