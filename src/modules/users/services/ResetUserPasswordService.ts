import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { IDateProvider } from "../providers/DateProvider/models/IDateProvider";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
export class ResetUserPasswordService {

  constructor(
    @inject("UsersTokenRepository")
    private usersTokenRepository: IUsersTokenRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
    @inject("HashProvider")
    private hashProvider: IHashProvider
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {

    const userToken = await this.usersTokenRepository.findByRefreshToken(token);

    if (!userToken) {
      throw new AppError("Token invalid!");
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError("User does not exists!");
    }

    if (this.dateProvider.compareIsBefore(userToken.expires_date, this.dateProvider.dateNow())) {
      throw new AppError("Token expired!");
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.update(user);

    await this.usersTokenRepository.deleteById(userToken.id);
  }
}