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

  public async findAssessmentsByCompany(company_id: string): Promise<AssessmentCompany[]> {
    const findAssessments = this.assessmentsCompany.filter((assessment) => assessment.company_id === company_id);

    return findAssessments;
  }

}