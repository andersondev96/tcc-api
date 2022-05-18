import { prisma } from "@database/prisma";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {
  async create(userData: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  }

  async findByMail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
}
