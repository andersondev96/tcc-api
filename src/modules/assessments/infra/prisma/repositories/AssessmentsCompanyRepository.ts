import { prisma } from "@database/prisma";
import { ICreateAssessmentDTO } from "@modules/assessments/dtos/ICreateAssessmentDTO";
import { IAssessmentsCompanyRepository } from "@modules/assessments/repositories/IAssessmentsCompanyRepository";

import { AssessmentCompany } from "../entities/AssessmentCompany";

export class AssessmentsCompanyRepository implements IAssessmentsCompanyRepository {

  public async create({
    user_id,
    company_id,
    comment,
    stars
  }: ICreateAssessmentDTO): Promise<AssessmentCompany> {
    const assessmentCompany = await prisma.assesmentCompany.create({
      data: {
        user_id,
        company_id,
        comment,
        stars
      }
    });

    return assessmentCompany;
  }

  public async findAssessmentById(assessment_id: string): Promise<AssessmentCompany> {
    const findAssessmentCompany = await prisma.assesmentCompany.findUnique({
      where: { id: assessment_id }
    });

    return findAssessmentCompany;
  }

  public async findAssessmentsByCompany(company_id: string): Promise<AssessmentCompany[]> {
    const assessmentsCompany = await prisma.assesmentCompany.findMany({
      where: { company_id }
    });

    return assessmentsCompany;
  }

  public async updateAssessmentsByCompany(assessment: ICreateAssessmentDTO): Promise<AssessmentCompany> {
    const takeAssessment = await prisma.assesmentCompany.update({
      where: { id: assessment.id },
      data: {
        comment: assessment.comment,
        stars: assessment.stars
      }
    });

    return takeAssessment;
  }

}