import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/prisma/entities/User";

export class UserMap {

  static toDTO({
    email,
    name,
    id,
    avatar,
    favorites
  }: User): IUserResponseDTO {
    const user = {
      email,
      name,
      id,
      avatar,
      avatar_url: avatar && `${process.env.APP_API_URL}/avatar/${avatar}`,
      favorites
    };
    return user;
  }
}