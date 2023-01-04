import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  highlight_service?: boolean;
}

@injectable()
export class UpdateServiceService {

  constructor(
    @inject("ServicesRepository")
    private servicesRepository: IServicesRepository
  ) { }

  public async execute({
    id,
    name,
    description,
    price,
    category,
    highlight_service
  }: IRequest): Promise<Service> {

    const service = await this.servicesRepository.findServiceById(id);

    if (!service) {
      throw new AppError("Service not found");
    }

    const serviceUpdate = await this.servicesRepository.update({
      id,
      name,
      description,
      price,
      category,
      highlight_service,
      company_id: service.company_id
    });

    return serviceUpdate;
  }
}