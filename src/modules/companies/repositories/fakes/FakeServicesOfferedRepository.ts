import { v4 as uuid } from "uuid";

import { ICreateServiceOfferedDTO } from "@modules/companies/dtos/ICreateServiceOfferedDTO";
import { ServiceOffered } from "@modules/companies/infra/prisma/entities/ServiceOffered";
import { IServicesOfferedRepository } from "../IServicesOfferedRepository";

export class FakeServicesOfferedRepository implements IServicesOfferedRepository {

    servicesOffered: ServiceOffered[] = [];

    public async create(data: ICreateServiceOfferedDTO): Promise<ServiceOffered> {
        Object.assign(data, {
            id: uuid(),
        });

        this.servicesOffered.push(data);

        return data;
    }

    public async findById(id: string): Promise<ServiceOffered> {
        const findByIdService = this.servicesOffered.find((service) => service.id === id);

        return findByIdService;
    }

    public async findByDescription(description: string): Promise<ServiceOffered> {
        const findDescription = this.servicesOffered.find((service) => service.description === description);

        return findDescription;
    }

}