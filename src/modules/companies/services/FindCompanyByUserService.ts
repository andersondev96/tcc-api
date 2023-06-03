import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class FindCompanyByUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,
  ) { }

  public async execute(user_id: string): Promise<Company> {
    const user = await this.userRepository.findById(user_id);

    if (user) {
      let company = await this.cacheProvider.recover<Company>(`companies-list:${user_id}`);

      if (!company) {
        company = await this.companyRepository.findByUser(user_id);

        console.log('A query no banco foi feita');

        await this.cacheProvider.save(`companies-list:${user_id}`, company);
      }


      return company;
    }
  }
}