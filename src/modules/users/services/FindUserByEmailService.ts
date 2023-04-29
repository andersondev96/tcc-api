import { inject, injectable } from "tsyringe";

import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { UserMap } from "../mapper/UserMap";
import { IUsersRepository } from "../repositories/IUsersRepository";

@injectable()
export class FindUserByEmailService {

  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) { }

  public async execute(email: string): Promise<IUserResponseDTO> {

    const user = await this.userRepository.findByMail(email);

    return UserMap.toDTO(user);
  }
}