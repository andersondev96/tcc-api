import { v4 as uuid } from "uuid";

import { ICreateAssessmentDTO } from "@modules/assessments/dtos/ICreateAssessmentDTO";
import { AssessmentCompany } from "@modules/assessments/infra/prisma/entities/AssessmentCompany";

import { IAssessmentsCompanyRepository } from "../IAssessmentsCompanyRepository";

export class FakeAssessmentsCompanyRepository implements IAssessmentsCompanyRepository {

  assessmentsCompany: AssessmentCompany[] = [];

  public async create(data: ICreateAssessmentDTO): Promise<AssessmentCompany> {
    Object.assign(data, {
      id: uuid()
    });

    this.assessmentsCompany.push(data);

    return data;
  }

  public async findAssessmentById(assessment_id: string): Promise<AssessmentCompany> {
    const findAssessment = this.assessmentsCompany.find((assessment) => assessment.id === assessment_id);

    return findAssessment;
  }

  public async findAssessmentsByCompany(company_id: string): Promise<AssessmentCompany[]> {
    const findAssessments = this.assessmentsCompany.filter((assessment) => assessment.company_id === company_id);

    return findAssessments;
  }

  public async takeAssessmentClassification(assessment: ICreateAssessmentDTO): Promise<AssessmentCompany> {
    const index = this.assessmentsCompany.findIndex(findAssessment => findAssessment.id === assessment.id);

    this.assessmentsCompany[index].stars = assessment.stars;

    return assessment;
  }

}