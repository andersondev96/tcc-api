import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { AssessmentCompany } from "../infra/prisma/entities/AssessmentCompany";
import { IAssessmentsCompanyRepository } from "../repositories/IAssessmentsCompanyRepository";

interface IRequest {
  user_id: string;
  company_id: string;
  comment: string;
  stars?: number;
}


@injectable()
export class CreateAssessmentsCompanyService {
  constructor(
    @inject("AssessmentsRepository")
    private assessmentRepository: IAssessmentsCompanyRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }

  public async execute({ user_id, company_id, comment, stars }: IRequest): Promise<AssessmentCompany> {

    const user = await this.userRepository.findById(user_id);

    if (user) {
      const company = await this.companyRepository.findById(company_id);

      if (!company) {
        throw new AppError("Company not found");
      }

      const assessment = await this.assessmentRepository.create({
        user_id,
        company_id,
        comment,
        stars
      });

      const companiesAssessment = await this.assessmentRepository.findAssessmentsByCompany(company.id);
      const totStars = companiesAssessment.reduce((sum, current) => sum + current.stars, 0);

      company.stars = Math.trunc((totStars / (companiesAssessment.length)));

      await this.companyRepository.updateStars(company.id, company.stars);

      return assessment;
    }

  }

}