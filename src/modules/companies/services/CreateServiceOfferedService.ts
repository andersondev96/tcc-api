import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ServicesOfferedRepository } from "../infra/prisma/repositories/ServicesOfferedRepository";

@injectable()
export class CreateServiceOfferedService {

    constructor(
        @inject("ServicesOfferedRepository")
        private servicesOfferedRepository: ServicesOfferedRepository
    ) { }

    public async execute(description: string) {

        const descriptionExists = await this.servicesOfferedRepository.findByDescription(
            description
        );

        if (descriptionExists) {
            throw new AppError("Description already exists!");
        }

        const serviceOffered = await this.servicesOfferedRepository.create({
            description
        });

        return serviceOffered;
    }

}