import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../infra/prisma/entities/Service";

export interface IServicesRepository {

  create(data: ICreateServiceDTO): Promise<Service>;

  listServicesByCompany(company_id: string, name?: string, category?: string, highlight_service?: boolean): Promise<Service[]>;

  findServiceById(id: string): Promise<Service>;

  update(data: ICreateServiceDTO): Promise<Service>;

  updateStars(service_id: string, stars: number): Promise<Service>;

  favoriteService(service_id: string): Promise<Service>;

  unfavoriteService(service_id: string): Promise<Service>;

  delete(id: string): Promise<void>;
}