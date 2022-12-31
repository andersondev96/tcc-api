import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/prisma/entities/Company";

export interface ICompaniesRepository {

  create(data: ICreateCompanyDTO): Promise<Company>;

  listAll(): Promise<Company[]>;

  listByLocalization(latitude: number, longitude: number): Promise<Company[] | undefined>;

  listByFilter(category?: string, state?: string, city?: string, price?: number): Promise<Company[] | undefined>;

  findByName(name: string): Promise<Company>;

  findByUser(user_id: string): Promise<Company>;

  findById(id: string): Promise<Company>;

  update(company: ICreateCompanyDTO): Promise<Company>;

  updateStars(company_id: string, stars: number): Promise<Company>;

  delete(id: string): Promise<void>;

}