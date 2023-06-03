import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";

@injectable()
export class UnfavoriteCompanyService {

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

    const favoriteCompany = await this.companyRepository.unfavoriteCompany(company_id);

    const favoritesUser = user.favorites.filter((item) => item !== company_id);

    user.favorites = favoritesUser;

    await this.userRepository.update({
      id: user.id,
      ...user
    });

    return favoriteCompany;
  }
}