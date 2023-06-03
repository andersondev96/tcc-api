import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class FavoriteCompanyService {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository
  ) { }

  public async execute(user_id: string, company_id: string): Promise<Company> {
    const user = await this.userRepository.findById(user_id);

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const favoriteCompany = await this.companyRepository.favoriteCompany(company_id);

    await this.userRepository.addFavorite(user.id, company_id);

    return favoriteCompany;
  }
}