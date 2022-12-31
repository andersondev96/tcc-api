import { v4 as uuid } from "uuid";

import { ICreateAssessmentDTO } from "@modules/assessments/dtos/ICreateAssessmentDTO";
import { Assessment } from "@modules/assessments/infra/prisma/entities/Assessment";

import { IAssessmentsRepository } from "../IAssessmentsRepository";

export class FakeAssessmentsRepository implements IAssessmentsRepository {

  assessments: Assessment[] = [];

  public async create(data: ICreateAssessmentDTO): Promise<Assessment> {
    Object.assign(data, {
      id: uuid()
    });

    this.assessments.push(data);

    return data;
  }

  public async findAssessmentById(assessment_id: string): Promise<Assessment> {
    const findAssessment = this.assessments.find((assessment) => assessment.id === assessment_id);

    return findAssessment;
  }

  public async findAssessments(table_id: string): Promise<Assessment[]> {
    const findAssessments = this.assessments.filter((assessment) => assessment.table_id === table_id);

    return findAssessments;
  }

  public async updateAssessments(assessment: ICreateAssessmentDTO): Promise<Assessment> {
    const index = this.assessments.findIndex(findAssessment => findAssessment.id === assessment.id);

    this.assessments[index] = assessment;

    return assessment;
  }

}