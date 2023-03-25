import { inject, injectable } from "tsyringe";

import { Company } from "@modules/companies/infra/prisma/entities/Company";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { Service } from "@modules/services/infra/prisma/entities/Service";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../repositories/IUsersRepository";

interface IResponse {
  companies: Company[];
  services: Service[];
}


@injectable()
export class ListFavoritesService {

  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("CompaniesRepository")
    private companiesRepository: ICompaniesRepository,
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository
  ) { }

  public async execute(user_id: string): Promise<IResponse> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const companiesPromises = user.favorites.map(async (favorite) => await this.companiesRepository.findById(favorite));

    const servicesPromises = user.favorites.map(async (favorite) => await this.servicesRepository.findServiceById(favorite));

    const companies = await Promise.all(companiesPromises);
    const services = await Promise.all(servicesPromises);

    return { companies, services };
  }
}