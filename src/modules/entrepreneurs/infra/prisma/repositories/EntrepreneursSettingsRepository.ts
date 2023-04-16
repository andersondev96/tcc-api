import { prisma } from "@database/prisma";
import { ICreateEntrepreneurSettingsDTO } from "@modules/entrepreneurs/dtos/ICreateEntrepreneurSettingsDTO";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";

import { EntrepreneurSettings } from "../entities/EntrepreneurSettings";

export class EntrepreneursSettingsRepository implements IEntrepreneursSettingsRepository {

  public async create({
    id,
    entrepreneur_id,
    company_logo,
    highlight_services_quantity,
    online_budget,
    online_chat,
    email_notification
  }: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.create({
      data: {
        id,
        entrepreneur_id,
        company_logo,
        highlight_services_quantity,
        online_budget,
        online_chat,
        email_notification
      }
    });

    return entrepreneurSettings;
  }

  public async findByCompany(company_id: string): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.findFirst({
      where: {
        entrepreneur: {
          company_id
        }
      }
    });

    return entrepreneurSettings;
  }

  public async findByEntrepreneur(entrepreneur_id: string): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.findUnique({
      where: { entrepreneur_id },
      include: {
        entrepreneur: {
          include: {
            company: true
          }
        }
      }
    });

    return entrepreneurSettings;
  }

  public async update(data: ICreateEntrepreneurSettingsDTO): Promise<EntrepreneurSettings> {
    const entrepreneurSettings = await prisma.entrepreneur_Settings.update({
      where: { entrepreneur_id: data.entrepreneur_id },
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