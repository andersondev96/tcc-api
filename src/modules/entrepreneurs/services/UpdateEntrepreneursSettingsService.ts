import { inject, injectable } from "tsyringe";

import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";
import { AppError } from "@shared/errors/AppError";

import { EntrepreneurSettings } from "../infra/prisma/entities/EntrepreneurSettings";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";

interface IRequest {
  entrepreneur_id: string;
  service_name_color?: string,
  service_price_color?: string,
  card_color?: string,
  highlight_services_quantity?: number,
  online_budget?: boolean,
  online_chat?: boolean,
  email_notification?: boolean
}
@injectable()
export class UpdateEntrepreneursSettingsService {

  constructor(
    @inject("EntrepreneursSettingsRepository")
    private entrepreneursSettingsRepository: IEntrepreneursSettingsRepository
  ) { }

  public async execute({
    entrepreneur_id,
    service_name_color,
    service_price_color,
    card_color,
    highlight_services_quantity,
    online_budget,
    online_chat,
    email_notification
  }: IRequest): Promise<EntrepreneurSettings> {

    const entrepreneur = await this.entrepreneursSettingsRepository.findByEntrepreneur(entrepreneur_id);

    if (!entrepreneur) {
      throw new AppError("Entrepreneur not found");
    }

    const entrepreneurSettings = await this.entrepreneursSettingsRepository.update({
      id: entrepreneur.id,
      entrepreneur_id: entrepreneur.entrepreneur_id,
      service_name_color,
      service_price_color,
      card_color,
      highlight_services_quantity,
      online_budget,
      online_chat,
      email_notification
    });

    return entrepreneurSettings;

  }
}