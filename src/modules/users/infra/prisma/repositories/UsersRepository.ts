import { prisma } from "@database/prisma";
import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { User } from "../entities/User";

export class UsersRepository implements IUsersRepository {

  async findById(id: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: {
        id
      }
    });

    return user;
  }

  async create({ name, email, password, id, avatar }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        id,
        avatar
      }
    });

    return user;
  }

  async findByMail(email: string): Promise<User | undefined> {
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });

    return user;
  }

  public async addFavorite(user_id: string, favorite: string): Promise<User> {
    const user = await prisma.user.findUnique({ where: { id: user_id } });
    if (!user) {
      throw new Error(`User with id ${user_id} not found`);
    }

    const updatedFavorites = [...user.favorites, favorite];
    const updateUser = await prisma.user.update({
      where: { id: user_id },
      data: { favorites: updatedFavorites }
    });

    return updateUser;
  }

  async update(user: ICreateUserDTO): Promise<User> {
    const updateUser = await prisma.user.update({
      where: { id: user.id },
      data: {
        ...user
      }
    });

    return updateUser;
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({
      where: { id }
    });
  }
}
