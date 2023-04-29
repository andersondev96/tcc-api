import { inject, injectable } from "tsyringe";

import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { AppError } from "@shared/errors/AppError";

import { EntrepreneurSettings } from "../infra/prisma/entities/EntrepreneurSettings";
import { IEntrepreneursRepository } from "../repositories/IEntrepreneursRepository";
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
    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository,
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository,
    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository
  ) { }

  public async execute({
    entrepreneur_id,
    highlight_services_quantity,
    online_budget,
    online_chat,
    email_notification
  }: IRequest): Promise<EntrepreneurSettings> {

    const entrepreneur = await this.entrepreneurRepository.findById(entrepreneur_id);

    if (!entrepreneur) {
      throw new AppError("Entrepreneur not found");
    }

    const settingsEntrepreneur = await this.entrepreneurSettingsRepository.findByEntrepreneur(entrepreneur_id);

    const sevicesByCompany = await this.serviceRepository.listServicesByCompany(
      entrepreneur.company_id
    );

    const contHighlightsService = sevicesByCompany.reduce((acc, service) => {
      if (service.highlight_service === true) {
        return acc + 1;
      } else {
        return acc;
      }
    }, 0);

    if (highlight_services_quantity < contHighlightsService) {
      throw new AppError("No is possible to decrease highlights, because has more services");
    }

    const entrepreneurSettings = await this.entrepreneurSettingsRepository.update({
      id: settingsEntrepreneur.id,
      entrepreneur_id: settingsEntrepreneur.entrepreneur_id,
      highlight_services_quantity,
      online_budget,
      online_chat,
      email_notification
    });

    return {
      ...entrepreneurSettings,
      company_logo: `${process.env.APP_API_URL}/company_logo/${entrepreneurSettings.company_logo}`
    };

  }
}