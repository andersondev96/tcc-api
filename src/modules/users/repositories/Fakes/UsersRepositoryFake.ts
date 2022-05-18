import { v4 as uuid } from "uuid";

import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { User } from "@modules/users/infra/prisma/entities/User";

import { IUsersRepository } from "../IUsersRepository";

export class UsersRepositoryFake implements IUsersRepository {
  private users: User[] = [];

  async create(data: ICreateUserDTO): Promise<User> {
    Object.assign(data, {
      id: uuid(),
    });

    this.users.push(data);
    return data;
  }

  async findByMail(email: string): Promise<User> {
    const findUser = this.users.find((user) => user.email === email);

    return findUser;
  }
}
