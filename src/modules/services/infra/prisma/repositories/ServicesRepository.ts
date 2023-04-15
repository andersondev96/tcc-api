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

  public async findServiceById(id: string): Promise<Service> {
    const service = await prisma.service.findUnique({
      where: {
        id
      }
    });

    return service;
  }

  public async listServicesByCompany(company_id: string, name?: string, category?: string, highlight_service?: boolean): Promise<Service[]> {
    const services = await prisma.service.findMany({
      where: {
        company_id,
        ...(name && {
          name: {
            contains: name
          }
        }),
        ...(category && { category }),
        ...(highlight_service && { highlight_service })
      }
    });

    return services;
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

  public async favoriteService(service_id: string): Promise<Service> {
    const addFavorite = await prisma.service.update({
      where: { id: service_id },
      data: {
        favorites: {
          increment: 1
        }
      }
    });

    return addFavorite;
  }

  public async unfavoriteService(service_id: string): Promise<Service> {
    const addFavorite = await prisma.service.update({
      where: { id: service_id },
      data: {
        favorites: {
          decrement: 1
        }
      }
    });

    return addFavorite;
  }

  public async delete(id: string): Promise<void> {
    await prisma.service.delete({
      where: { id }
    });
  }

}