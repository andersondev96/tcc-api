import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { AssessmentCompany } from "../infra/prisma/entities/AssessmentCompany";
import { IAssessmentsCompanyRepository } from "../repositories/IAssessmentsCompanyRepository";

interface IRequest {
  assessment_id: string;
  comment: string;
  stars?: number;
}

@injectable()
export class UpdateAssessmentsByCompanyService {

  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsCompanyRepository
  ) { }

  public async execute({ assessment_id, comment, stars }: IRequest): Promise<AssessmentCompany> {

    const findAssessment = await this.assessmentRepository.findAssessmentById(assessment_id);

    if (!findAssessment) {
      throw new AppError("Assessment not found");
    }

    const assessment = await this.assessmentRepository.takeAssessmentClassification({
      id: assessment_id,
      user_id: findAssessment.user_id,
      company_id: findAssessment.company_id,
      comment,
      stars
    });

    return assessment;
  }

}