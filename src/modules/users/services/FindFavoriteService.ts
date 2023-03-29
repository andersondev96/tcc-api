import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";

import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class FindFavoriteService {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository
  ) { }

  public async execute(user_id: string, table_id: string): Promise<string[]> {

    const user = await this.userRepository.findById(user_id);

    const favorite = user.favorites.filter((favorite) => favorite === table_id);

    return favorite;
  }
}