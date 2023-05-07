import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

@injectable()
export class FindAssessmentsByCompanyService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,

    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository
  ) { }

  public async execute(company_id: string): Promise<Assessment[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const assessments = await this.assessmentRepository.findAssessments(company_id);

    const assessmentsUserAvatar = assessments.map((assessment) => {
      if (!assessment.user) {
        return assessment;
      }

      const userWithAvatar = {
        ...assessment.user,
        avatar: assessment.user.avatar
          ? `${process.env.APP_API_URL}/avatar/${assessment.user.avatar}`
          : undefined
      }

      return {
        ...assessment,
        user: userWithAvatar
      };
    });

    return assessmentsUserAvatar;
  }
}