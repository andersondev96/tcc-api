import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IServicesRepository } from "../repositories/IServicesRepository";

@injectable()
export class DeleteServiceService {

    constructor(
        @inject("ServicesRepository")
        private servicesRepository: IServicesRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider,

    ) { }

    public async execute(service_id: string): Promise<void> {

        const service = await this.servicesRepository.findServiceById(service_id);

        if (!service) {
            throw new AppError("Service not found");
        }

        if (service.image_url) {
            await this.storageProvider.delete(service.image_url, "services");
        }

        await this.servicesRepository.delete(service_id);
    }
}