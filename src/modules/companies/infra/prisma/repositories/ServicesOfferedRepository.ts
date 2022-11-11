import { prisma } from "@database/prisma";
import { ICreateServiceOfferedDTO } from "@modules/companies/dtos/ICreateServiceOfferedDTO";
import { IServicesOfferedRepository } from "@modules/companies/repositories/IServicesOfferedRepository";
import { ServiceOffered } from "../entities/ServiceOffered";

export class ServicesOfferedRepository implements IServicesOfferedRepository {

    public async create({ id, description }: ICreateServiceOfferedDTO): Promise<ServiceOffered> {
        const createServiceOffered = await prisma.serviceOffered.create({
            data: { description, id },
        });

        return createServiceOffered;
    }

    public async findById(id: string): Promise<ServiceOffered> {
        const serviceOffered = await prisma.serviceOffered.findUnique({
            where: { id },
        });

        return serviceOffered;
    }

    public async findByDescription(description: string): Promise<ServiceOffered> {
        const findDescription = await prisma.serviceOffered.findUnique({
            where: { description }
        });

        return findDescription;
    }

}