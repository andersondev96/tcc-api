import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { Assessment } from "../infra/prisma/entities/Assessment";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";

interface IRequest {
  assessment_id: string;
  comment: string;
  stars?: number;
}

@injectable()
export class UpdateAssessmentsByCompanyService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository

  ) { }

  public async execute({ assessment_id, comment, stars }: IRequest): Promise<Assessment> {

    const findAssessment = await this.assessmentRepository.findAssessmentById(assessment_id);

    if (!findAssessment) {
      throw new AppError("Assessment not found");
    }

    const company = await this.companyRepository.findById(findAssessment.table_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const assessment = await this.assessmentRepository.updateAssessments({
      id: assessment_id,
      user_id: findAssessment.user_id,
      table_id: findAssessment.table_id,
      comment,
      stars
    });

    const companiesAssessment = await this.assessmentRepository.findAssessments(findAssessment.table_id);
    const totStars = companiesAssessment.reduce((sum, current) => sum + current.stars, 0);


    company.stars = Math.trunc((totStars / (companiesAssessment.length)));

    await this.companyRepository.updateStars(company.id, company.stars);

    return assessment;

  }

}