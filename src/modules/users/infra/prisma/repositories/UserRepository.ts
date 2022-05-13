import { prisma } from "../../../../../prisma";
import ICreateUserDTO from "../../../dtos/ICreateUserDTO";
import { IUserRepository } from "../../../repositories/IUserRepository";

export class UserRepository implements IUserRepository {
  async create({ name, email, password }: ICreateUserDTO): Promise<void> {
    await prisma.user.create({
      data: {
        name,
        email,
        password,
      },
    });
  }
}
