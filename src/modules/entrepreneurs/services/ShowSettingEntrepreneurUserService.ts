import { inject, injectable } from "tsyringe";

import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { EntrepreneurSettings } from "../infra/prisma/entities/EntrepreneurSettings";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";

@injectable()
export class ShowSettingEntrepreneurUserService {

  constructor(
    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettings: IEntrepreneursSettingsRepository,
    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository,
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }

  public async execute(user_id: string): Promise<EntrepreneurSettings> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const entrepreneur = await this.entrepreneurRepository.findByUser(user_id);

    if (!entrepreneur) {
      throw new AppError("Entrepreneur not found");
    }

    const settings = await this.entrepreneurSettings.findByEntrepreneur(entrepreneur.id);

    return {
      ...settings,
      company_logo: `${process.env.APP_API_URL}/company_logo/${settings.company_logo}`
    };
  }
}