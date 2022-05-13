import ICreateUserDTO from "@modules/users/dtos/ICreateUserDTO";
import { IUserRepository } from "@modules/users/repositories/IUserRepository";
import { User } from "@prisma/client";

import { prisma } from "../../../../../prisma";

export class UserRepository implements IUserRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
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
