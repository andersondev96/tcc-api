import { ICreateEntrepreneurSettingsDTO } from "../dtos/ICreateEntrepreneurSettingsDTO";
import { EntrepreneurSettings } from "../infra/prisma/entities/EntrepreneurSettings";

export interface IEntrepreneursSettingsRepository {
  create(data: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings>;

  findByCompany(company_id: string): Promise<EntrepreneurSettings>;

  findByEntrepreneur(entrepreneur_id: string): Promise<EntrepreneurSettings>;

  update(data: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings>;

  delete(id: string): Promise<void>;
}