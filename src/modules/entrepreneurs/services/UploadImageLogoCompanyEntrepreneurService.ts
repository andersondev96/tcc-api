import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { IEntrepreneursRepository } from "../repositories/IEntrepreneursRepository";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";

@injectable()
export class UploadImageLogoCompanyEntrepreneurService {

  constructor(
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository,
    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  public async execute(entrepreneur_id: string, image_url: string): Promise<void> {
    const entrepreneurSettings = await this.entrepreneurSettingsRepository.findByEntrepreneur(entrepreneur_id);

    if (!entrepreneurSettings) {
      throw new AppError("Entrepreneur not found");
    }

    const entrepreneur = await this.entrepreneurRepository.findById(entrepreneur_id);

    if (!entrepreneur.company_id) {
      throw new AppError("Company not found");
    }

    if (entrepreneurSettings.company_logo) {
      await this.storageProvider.delete(entrepreneurSettings.company_logo, "company_logo");
    }

    await this.storageProvider.save(image_url, "company_logo");

    entrepreneurSettings.company_logo = image_url;

    await this.entrepreneurSettingsRepository.update(entrepreneurSettings);
  }
}