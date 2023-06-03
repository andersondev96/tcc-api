import { inject, injectable } from "tsyringe";

import { Entrepreneur } from "@modules/entrepreneurs/infra/prisma/entities/Entrepreneur";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

@injectable()
export class FindUserByEntrepreneurService {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository,
    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository
  ) { }

  public async execute(user_id: string): Promise<Entrepreneur> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    const entrepreneur = await this.entrepreneurRepository.findByUser(user_id);

    return entrepreneur;
  }
}