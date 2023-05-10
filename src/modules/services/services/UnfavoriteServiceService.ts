import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { getServiceImageUrl } from "@shared/utils/getFilesUrl";
import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  user_id: string;
  service_id: string;
}

@injectable()
export class UnfavoriteServiceService {

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

    const favoriteService = await this.servicesRepository.unfavoriteService(service_id);

    const favoritesUser = user.favorites.filter((item) => item !== service_id);

    user.favorites = favoritesUser;

    const unfavorited = await this.usersRepository.update({
      id: user.id,
      ...user
    });

    return {
      ...favoriteService,
      image_url: getServiceImageUrl(service, "service")
    };
  }
}