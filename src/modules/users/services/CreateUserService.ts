import { inject, injectable } from "tsyringe";

import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { AppError } from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { UsersRepository } from "../infra/prisma/repositories/UsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  name: string;
  email: string;
  password: string;
  isEntrepreneur?: boolean;
}

@injectable()
export class CreateUserService {
  constructor(
    @inject("UsersRepository")
    private userRepository: UsersRepository,

    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository,

    @inject("EntrepreneursSettingsRepository")
    private entrepreneurSettingsRepository: IEntrepreneursSettingsRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) { }

  public async execute({ name, email, password, isEntrepreneur }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByMail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used");
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword
    });

    if (isEntrepreneur) {
      const entrepreneur = await this.entrepreneurRepository.create({
        user_id: user.id
      });

      await this.entrepreneurSettingsRepository.create({
        entrepreneur_id: entrepreneur.id
      });
    }

    delete user.password;

    return user;
  }
}
