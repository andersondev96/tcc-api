import { prisma } from "@database/prisma";
import { ICreateAssessmentDTO } from "@modules/assessments/dtos/ICreateAssessmentDTO";
import { IAssessmentsRepository } from "@modules/assessments/repositories/IAssessmentsRepository";

import { Assessment } from "../entities/Assessment";

export class AssessmentsRepository implements IAssessmentsRepository {

  public async create({
    user_id,
    table_id,
    comment,
    stars
  }: ICreateAssessmentDTO): Promise<Assessment> {
    const assessment = await prisma.assessment.create({
      data: {
        user_id,
        table_id,
        comment,
        stars
      }
    });

    return assessment;
  }

  public async findAssessmentById(assessment_id: string): Promise<Assessment> {
    const findAssessment = await prisma.assessment.findUnique({
      where: { id: assessment_id },
      include: {
        user: true
      }
    });

    return findAssessment;
  }

  public async findAssessments(table_id: string): Promise<Assessment[]> {
    const assessments = await prisma.assessment.findMany({
      where: { table_id },
      include: {
        user: true
      }
    });

    return assessments;
  }

  public async updateAssessments(assessment: ICreateAssessmentDTO): Promise<Assessment> {
    const takeAssessment = await prisma.assessment.update({
      where: { id: assessment.id },
      data: {
        comment: assessment.comment,
        stars: assessment.stars
      }
    });

    return takeAssessment;
  }

}