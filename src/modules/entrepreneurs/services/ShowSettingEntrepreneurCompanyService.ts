import { inject, injectable } from "tsyringe";

import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";
import { AppError } from "@shared/errors/AppError";

import { EntrepreneurSettings } from "../infra/prisma/entities/EntrepreneurSettings";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";

@injectable()
export class ShowSettingEntrepreneurCompanyService {

  constructor(
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettings: IEntrepreneursSettingsRepository,
    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository,
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository
  ) { }

  public async execute(company_id: string): Promise<EntrepreneurSettings> {
    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const entrepreneur = await this.entrepreneurRepository.findByCompany(company_id);

    if (!entrepreneur) {
      throw new AppError("Entrepreneur not found");
    }

    const settings = await this.entrepreneurSettings.findByEntrepreneur(entrepreneur.id);

    return settings;
  }
}