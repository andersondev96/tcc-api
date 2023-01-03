import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class FindCompanyByUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository
  ) { }

  public async execute(user_id: string): Promise<Company> {
    const user = await this.userRepository.findById(user_id);

    if (user) {
      const company = await this.companyRepository.findByUser(user_id);

      return company;
    }
  }
}