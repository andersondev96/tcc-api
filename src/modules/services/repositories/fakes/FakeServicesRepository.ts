import { v4 as uuid } from "uuid";

import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { Service } from "@modules/services/infra/prisma/entities/Service";
import { IServicesRepository } from "../IServicesRepository";

export class FakeServicesRepository implements IServicesRepository {

    private services: Service[] = [];

    public async create(data: ICreateServiceDTO): Promise<Service> {
        Object.assign(data, {
            id: uuid(),
        });

        this.services.push(data);

        return data;
    }

    public async listServicesByCompany(company_id: string): Promise<Service[]> {
        const services = this.services.filter((service) => service.company_id === company_id);

        return services;
    }

    public async listServicesByCategory(category: string): Promise<Service[]> {

        const services = this.services.filter((service) => service.category.indexOf(category));

        return services;
    }

    public async findServicesByName(name: string): Promise<Service[]> {
        const services = this.services.filter((service) => service.name.indexOf(name));

        return services;
    }

    public async findServiceById(id: string): Promise<Service> {
        const service = this.services.find((service) => service.id === id);

        return service;
    }

    public async update(data: ICreateServiceDTO): Promise<Service> {
        const index = this.services.findIndex(service => service.id === data.id);

        this.services[index] = data;

        return data;
    }

    public async delete(id: string): Promise<void> {
        const index = this.services.findIndex(service => service.id === id);

        this.services.splice(index, 1);
    }

}