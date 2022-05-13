import { User } from "@prisma/client";
import { hash } from "bcryptjs";

import AppError from "@shared/errors/AppError";

import { UserRepository } from "../infra/prisma/repositories/UserRepository";

interface IRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  constructor(private userRepository: UserRepository) {}

  public async execute({ name, email, password }: IRequest): Promise<User> {
    const checkUserExists = await this.userRepository.findByMail(email);

    if (checkUserExists) {
      throw new AppError("Email address already used");
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    delete user.password;

    return user;
  }
}
