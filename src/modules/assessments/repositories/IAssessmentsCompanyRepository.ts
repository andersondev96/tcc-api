import { ICreateAssessmentDTO } from "../dtos/ICreateAssessmentDTO";
import { AssessmentCompany } from "../infra/prisma/entities/AssessmentCompany";

export interface IAssessmentsCompanyRepository {

  create(data: ICreateAssessmentDTO): Promise<AssessmentCompany>;

  findAssessmentById(assessment_id: string): Promise<AssessmentCompany>;

  findAssessmentsByCompany(company_id: string): Promise<AssessmentCompany[]>;

  updateAssessmentsByCompany(assessment: ICreateAssessmentDTO): Promise<AssessmentCompany>
}