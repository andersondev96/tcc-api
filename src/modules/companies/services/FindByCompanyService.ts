
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class FindByCompanyService {
  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,

  ) { }

  public async execute(id: string): Promise<Company> {

    let company = await this.cacheProvider.recover<Company>(`company:${id}`);

    if (!company) {
      company = await this.companyRepository.findById(id);

      if (!company) {
        throw new AppError("Company does not exist");
      }

      console.log('A query no banco foi feita');

      await this.cacheProvider.save(`company:${id}`, company);
    }

    return company;


  }
}