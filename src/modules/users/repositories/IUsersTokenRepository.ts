import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/prisma/entities/UserToken";

export interface IUsersTokenRepository {
  create(data: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserAndRefreshToken(
    user_id: string,
    refresh_token: string
  ): Promise<UserToken>;

  deleteById(id: string): Promise<void>;

  findByRefreshToken(refresh_token: string): Promise<UserToken>;
}
