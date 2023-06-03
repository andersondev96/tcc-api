import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/prisma/entities/Company";

export interface ICompaniesRepository {

  create(data: ICreateCompanyDTO): Promise<Company>;

  listAll(): Promise<Company[]>;

  findByName(name: string): Promise<Company>;

  findByUser(user_id: string): Promise<Company>;

  findById(id: string): Promise<Company>;

  update(company: ICreateCompanyDTO): Promise<Company>;

  updateStars(company_id: string, stars: number): Promise<Company>;

  favoriteCompany(company_id: string): Promise<Company>;

  unfavoriteCompany(company_id: string): Promise<Company>;

  delete(id: string): Promise<void>;

}