import { prisma } from "@database/prisma";
import { ICreateServiceDTO } from "@modules/services/dtos/ICreateServiceDTO";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";

import { Service } from "../entities/Service";

export class ServicesRepository implements IServicesRepository {

  public async create({
    id,
    name,
    description,
    price,
    category,
    image_url,
    highlight_service,
    favorites,
    stars,
    assessments,
    company_id
  }: ICreateServiceDTO): Promise<Service> {
    const service = await prisma.service.create({
      data: {
        id,
        name,
        description,
        price,
        category,
        image_url,
        highlight_service,
        favorites,
        stars,
        assessments,
        company_id
      }
    });

    return service;
  }

  public async listServicesByCompany(company_id: string): Promise<Service[]> {
    const services = await prisma.service.findMany({
      where: { company_id }
    });

    return services;
  }

  public async listServicesByCategory(company_id: string): Promise<Service[]> {
    const servicesByCategory = await prisma.service.groupBy({
      by: ["category"],
      where: { company_id },
      _count: {
        category: true
      }
    });

    const services: Service[] = servicesByCategory.map(service => {
      return {
        name: "",
        description: "",
        price: 0,
        category: service.category,
        company_id: "",
        favorites: 0,
        stars: 0,
        assessments: service._count.category
      };
    });

    return services;
  }

  public async findServicesByName(company_id: string, name: string): Promise<Service[]> {
    const services = await prisma.service.findMany({
      where: {
        company_id,
        name: {
          contains: name
        }
      }
    });

    return services;
  }

  public async findServiceById(id: string): Promise<Service> {
    const service = await prisma.service.findUnique({
      where: {
        id
      }
    });

    return service;
  }

  public async update(data: ICreateServiceDTO): Promise<Service> {
    const service = await prisma.service.update({
      where: { id: data.id },
      data: { ...data }
    });

    return service;
  }

  public async updateStars(service_id: string, stars: number): Promise<Service> {
    const service = await prisma.service.update({
      where: { id: service_id },
      data: {
        stars
      }
    });

    return service;
  }

  public async delete(id: string): Promise<void> {
    await prisma.service.delete({
      where: { id }
    });
  }

}