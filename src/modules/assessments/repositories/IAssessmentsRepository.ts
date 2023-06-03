import { ICreateAssessmentDTO } from "../dtos/ICreateAssessmentDTO";
import { Assessment } from "../infra/prisma/entities/Assessment";

export interface IAssessmentsRepository {

  create(data: ICreateAssessmentDTO): Promise<Assessment>;

  findAssessmentById(assessment_id: string): Promise<Assessment>;

  findAssessments(table_id: string): Promise<Assessment[]>;

  updateAssessments(assessment: ICreateAssessmentDTO): Promise<Assessment>
}