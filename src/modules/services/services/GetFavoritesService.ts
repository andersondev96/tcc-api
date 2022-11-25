import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
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

    public async execute({ user_id, service_id }: IRequest): Promise<void> {

        const service = await this.servicesRepository.findServiceById(service_id);

        if (!service) {
            throw new AppError("Service not found");
        }

        if (!service.favorites) {
            service.favorites = 1;
        } else {
            service.favorites += 1;
        }

        await this.servicesRepository.update(service);
    }
}