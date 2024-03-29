import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  service_id: string;
  image_url: string;
}

@injectable()
export class UpdateServiceImageService {

  constructor(
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ service_id, image_url }: IRequest): Promise<void> {

    const service = await this.servicesRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    if (service.image_url) {
      await this.storageProvider.delete(service.image_url, "service");
    }

    await this.storageProvider.save(image_url, "service");

    service.image_url = image_url;

    await this.servicesRepository.update(service);
  }
}