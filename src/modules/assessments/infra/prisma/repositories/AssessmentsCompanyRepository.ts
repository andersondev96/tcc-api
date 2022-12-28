import { prisma } from "@database/prisma";
import { ICreateAssessmentDTO } from "@modules/assessments/dtos/ICreateAssessmentDTO";
import { IAssessmentsCompanyRepository } from "@modules/assessments/repositories/IAssessmentsCompanyRepository";

import { AssessmentCompany } from "../entities/AssessmentCompany";

export class AssessmentsCompanyRepository implements IAssessmentsCompanyRepository {

  public async create({
    user_id,
    company_id,
    comment
  }: ICreateAssessmentDTO): Promise<AssessmentCompany> {
    const assessmentCompany = await prisma.assesmentCompany.create({
      data: {
        user_id,
        company_id,
        comment
      }
    });

    return assessmentCompany;
  }

  public async findAssessmentsByCompany(company_id: string): Promise<AssessmentCompany[]> {
    const assessmentsCompany = await prisma.assesmentCompany.findMany({
      where: { company_id }
    });

    return assessmentsCompany;
  }

}