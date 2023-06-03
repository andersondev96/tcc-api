import { inject, injectable } from "tsyringe";

import { Service } from "@modules/services/infra/prisma/entities/Service";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { ServiceMapper } from "../mapper/ServiceMapper";

@injectable()
export class ShowServiceService {

  constructor(
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository
  ) { }

  public async execute(service_id: string): Promise<Service> {

    const service = await this.serviceRepository.findServiceById(service_id);

    if (!service) {
      throw new AppError("Service not found");
    }

    return ServiceMapper.toDTO(service);
  }
}