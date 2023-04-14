import { inject, injectable } from "tsyringe";


import { User } from "../infra/prisma/entities/User";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class FindUserByEmailService {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }

  public async execute(email: string): Promise<User> {

    const user = await this.userRepository.findByMail(email);

    return user;
  }
}