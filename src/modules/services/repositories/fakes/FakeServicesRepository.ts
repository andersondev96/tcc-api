import { v4 as uuid } from "uuid";

import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { Service } from "@modules/services/infra/prisma/entities/Service";

import { IServicesRepository } from "../IServicesRepository";

export class FakeServicesRepository implements IServicesRepository {

  private services: Service[] = [];

  public async create(data: ICreateServiceDTO): Promise<Service> {
    Object.assign(data, {
      id: uuid()
    });

    this.services.push(data);

    return data;
  }

  public async listServicesByCompany(company_id: string, name?: string, category?: string, highlight_service?: boolean): Promise<Service[]> {
    const findServices = this.services.filter(
      (service) => service.company_id === company_id
    );

    const serviceFilter =
      findServices.filter(service =>
        service.name.includes(name) || service.category === category || highlight_service);

    return serviceFilter;
  }

  public async listServicesByCategory(company_id: string, category: string): Promise<Service[]> {

    const services = this.services.filter((service) => service.company_id === company_id && service.category === category);

    return services;
  }

  public async findServicesByName(company_id: string, name: string): Promise<Service[]> {
    const services = this.services.filter((service) => service.company_id === company_id && service.name.includes(name));

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

  public async updateStars(service_id: string, stars: number): Promise<Service> {
    const index = this.services.findIndex(findService => findService.id === service_id);

    this.services[index].stars = stars;

    return this.services[index];
  }

  public async favoriteService(service_id: string): Promise<Service> {
    const index = this.services.findIndex(service => service.id === service_id);

    if (!this.services[index].favorites) {
      this.services[index].favorites = 0;
    }

    this.services[index].favorites += 1;

    return this.services[index];
  }

  public async unfavoriteService(service_id: string): Promise<Service> {
    const index = this.services.findIndex(service => service.id === service_id);

    if (!this.services[index].favorites) {
      this.services[index].favorites = 0;
    }

    this.services[index].favorites -= 1;

    return this.services[index];
  }

  public async delete(id: string): Promise<void> {
    const index = this.services.findIndex(service => service.id === id);

    this.services.splice(index, 1);
  }

}