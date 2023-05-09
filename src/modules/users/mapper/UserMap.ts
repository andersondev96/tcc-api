import { getUserAvatarUrl } from "@shared/utils/getFilesUrl";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";
import { User } from "../infra/prisma/entities/User";

export class UserMap {

  static toDTO(user: User): IUserResponseDTO {

    const { id, email, name, avatar, favorites } = user;

    const userDTO = {
      id,
      name,
      email,
      avatar,
      avatar_url: getUserAvatarUrl(user, "avatar"),
      favorites
    };

    return userDTO;
  }
}