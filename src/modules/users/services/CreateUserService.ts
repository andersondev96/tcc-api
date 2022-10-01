import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { UsersRepository } from "../infra/prisma/repositories/UsersRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    name: string;
    email: string;
    password: string;
}

@injectable()
export class CreateUserService {
    constructor(
        @inject("UsersRepository")
        private userRepository: UsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) { }

    public async execute({ name, email, password }: IRequest): Promise<User> {
        const checkUserExists = await this.userRepository.findByMail(email);

        if (checkUserExists) {
            throw new AppError("Email address already used");
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        delete user.password;

        return user;
    }
}
