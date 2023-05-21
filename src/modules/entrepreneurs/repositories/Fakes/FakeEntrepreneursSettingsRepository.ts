import { v4 as uuid } from "uuid";

import { ICreateEntrepreneurSettingsDTO } from "@modules/entrepreneurs/dtos/ICreateEntrepreneurSettingsDTO";
import { EntrepreneurSettings } from "@modules/entrepreneurs/infra/prisma/entities/EntrepreneurSettings";

import { IEntrepreneursSettingsRepository } from "../IEntrepreneursSettingsRepository";

export class FakeEntrepreneursSettingsRepository implements IEntrepreneursSettingsRepository {

  entrepreneursSettings: EntrepreneurSettings[] = [];

  public async create(data: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = new EntrepreneurSettings(data);

    Object.assign(entrepreneurSettings, {
      id: uuid()
    });

    this.entrepreneursSettings.push(entrepreneurSettings);

    return entrepreneurSettings;
  }


  public async findByEntrepreneur(entrepreneur_id: string): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = this.entrepreneursSettings.find(settings => settings.entrepreneur_id === entrepreneur_id);

    return entrepreneurSettings;
  }

  public async findByCompany(company_id: string): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = this.entrepreneursSettings.find(settings => settings.entrepreneur.company_id === company_id);

    return entrepreneurSettings;
  }

  public async update(data: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings> {
    const index = this.entrepreneursSettings.findIndex(settings => settings.id === data.id);

    this.entrepreneursSettings[index] = data;

    return data;
  }

  public async delete(id: string): Promise<void> {
    const index = this.entrepreneursSettings.findIndex(settings => settings.id === id);

    this.entrepreneursSettings.splice(index, 1);
  }

}