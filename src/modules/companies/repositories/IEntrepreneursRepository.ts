import { ICreateEntrepreneurDTO } from "../dtos/ICreateEntrepreneurDTO";
import { Entrepreneur } from "../infra/prisma/entities/Entrepreneur";

export interface IEntrepreneursRepository {

  create(data: ICreateEntrepreneurDTO): Promise<Entrepreneur>;

  findById(id: string): Promise<Entrepreneur>;

  findByUser(user_id: string): Promise<Entrepreneur>;

  findByCompany(company_id: string): Promise<Entrepreneur>;

  update(data: ICreateEntrepreneurDTO): Promise<Entrepreneur>;

  delete(id: string): Promise<void>;
}