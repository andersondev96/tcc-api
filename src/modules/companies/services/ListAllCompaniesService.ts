
import { inject, injectable } from "tsyringe";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class ListAllCompaniesService {
  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,

  ) { }

  public async execute(): Promise<Company[]> {

    const cacheData = await this.cacheProvider.recover('afsf');

    console.log(cacheData);

    const companies = await this.companyRepository.listAll();

    // await this.cacheProvider.save("afsf", "agafg");

    return companies;
  }
}