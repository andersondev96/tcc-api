
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class FindByCompanyService {
  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository

  ) { }

  public async execute(id: string): Promise<Company> {

    const company = await this.companyRepository.findById(id);

    if (!company) {
      throw new AppError("Company does not exist");
    }

    return company;
  }
}