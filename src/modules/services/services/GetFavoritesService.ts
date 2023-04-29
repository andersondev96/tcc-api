import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  user_id: string;
  service_id: string;
}

@injectable()
export class GetFavoritesService {

  constructor(
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository,

    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ user_id, service_id }: IRequest): Promise<Service> {
    const user = await this.usersRepository.findById(user_id);

    const service = await this.servicesRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    const favoriteService = await this.servicesRepository.favoriteService(service_id);

    await this.usersRepository.addFavorite(user.id, service_id);

    return {
      ...favoriteService,
      image_url: favoriteService.image_url
        ? `${process.env.APP_API_URL}/service/${favoriteService.image_url}`
        : undefined
    };
  }
}