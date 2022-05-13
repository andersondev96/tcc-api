import { User } from "@prisma/client";

import ICreateUserDTO from "../dtos/ICreateUserDTO";

export interface IUserRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<User>;
  findByMail(email: string): Promise<User | undefined>;
}
