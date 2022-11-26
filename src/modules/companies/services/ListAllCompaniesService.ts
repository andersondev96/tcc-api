
import { inject, injectable } from "tsyringe";

import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class ListAllCompaniesService {
  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

  ) { }

  public async execute(): Promise<Company[]> {

    const companies = await this.companyRepository.listAll();

    return companies;
  }
}