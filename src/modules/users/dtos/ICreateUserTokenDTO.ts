import { User } from "../infra/prisma/entities/User";

export interface ICreateUserTokenDTO {
  user_id: string;
  user: User;
  expires_date: Date;
  refresh_token: string;
}
