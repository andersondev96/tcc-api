import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../infra/prisma/entities/Service";

export interface IServicesRepository {

  create(data: ICreateServiceDTO): Promise<Service>;

  listServicesByCompany(company_id: string): Promise<Service[]>;

  listServicesByCategory(company_id: string, category: string): Promise<Service[]>;

  findServicesByName(company_id: string, name: string): Promise<Service[]>;

  findServiceById(id: string): Promise<Service>;

  update(data: ICreateServiceDTO): Promise<Service>;

  updateStars(service_id: string, stars: number): Promise<Service>;

  delete(id: string): Promise<void>;
}