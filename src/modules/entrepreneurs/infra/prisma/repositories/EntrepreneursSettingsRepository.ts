import { prisma } from "@database/prisma";
import { ICreateEntrepreneurSettingsDTO } from "@modules/entrepreneurs/dtos/ICreateEntrepreneurSettingsDTO";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";

import { EntrepreneurSettings } from "../entities/EntrepreneurSettings";

export class EntrepreneursSettingsRepository implements IEntrepreneursSettingsRepository {

  public async create({
    id,
    entrepreneur_id,
    service_name_color,
    service_price_color,
    card_color,
    highlight_services_quantity,
    online_budget,
    online_chat,
    email_notification
  }: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.create({
      data: {
        id,
        entrepreneur_id,
        service_name_color,
        service_price_color,
        card_color,
        highlight_services_quantity,
        online_budget,
        online_chat,
        email_notification
      }
    });

    return entrepreneurSettings;
  }
  public async findByEntrepreneur(entrepreneur_id: string): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.findUnique({
      where: { entrepreneur_id }
    });

    return entrepreneurSettings;
  }

  public async update(data: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.update({
      where: { id: data.entrepreneur_id },
      data: { ...data }
    });

    return entrepreneurSettings;
  }
  public async delete(id: string): Promise<void> {
    await prisma.entrepreneur_Settings.delete({
      where: { id }
    });
  }

}