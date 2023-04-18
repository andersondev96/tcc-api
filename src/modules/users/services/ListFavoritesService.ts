import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { IUsersRepository } from "../repositories/IUsersRepository";

interface IResponse {
  companies: {
    id: string;
    name: string;
    image: string;
  }[];
  services: {
    id: string;
    name: string;
    description: string;
  }[];
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

    const companies = await Promise.all(
      user.favorites.map(async (favorite) => await this.companiesRepository.findById(favorite))
    );

    const services = await Promise.all(
      user.favorites.map(async (favorite) => await this.servicesRepository.findServiceById(favorite))
    );


    const formattedCompanies = companies
      .filter(Boolean)
      .map(({ id, name, ImageCompany, favorites }) => ({
        id,
        name,
        image: ImageCompany.length > 0 ? ImageCompany[0].image_url : null,
        favorites
      }));

    const formattedServices = services
      .filter(Boolean)
      .map(({ id, name, description, image_url, favorites }) => ({
        id,
        name,
        description,
        image_url,
        favorites
      }));

    return { companies: formattedCompanies, services: formattedServices };
  }

}