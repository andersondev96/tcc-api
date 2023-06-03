import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { getUserAvatarUrl } from "@shared/utils/getFilesUrl";
import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

@injectable()
export class FindAssessmentsByCompanyService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider

  ) { }

  public async execute(company_id: string): Promise<Assessment[]> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    let assessmentsUserAvatar = await this.cacheProvider.recover<Assessment[]>(`assessments-company:${company_id}`);

    if (!assessmentsUserAvatar) {
      const assessments = await this.assessmentRepository.findAssessments(company_id);

      assessmentsUserAvatar = assessments.map((assessment) => {
        if (!assessment.user) {
          return assessment;
        }

        const userWithAvatar = {
          ...assessment.user,
          avatar: getUserAvatarUrl(assessment.user, "avatar")
        }

        return {
          ...assessment,
          user: userWithAvatar
        };
      });

      await this.cacheProvider.save(`assessments-company:${company_id}`, assessmentsUserAvatar);

    }

    return assessmentsUserAvatar;
  }
}