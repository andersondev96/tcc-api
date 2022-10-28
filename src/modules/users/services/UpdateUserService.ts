import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { UsersRepository } from "../infra/prisma/repositories/UsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    id?: string;
    name: string;
    email: string;
    password: string;
}

@injectable()
export class UpdateUserService {
    constructor(
        @inject("UsersRepository")
        private userRepository: UsersRepository,

        @inject("HashProvider")
        private hashProvider: IHashProvider
    ) { }

    public async execute({ id, name, email, password }: IRequest): Promise<User> {
        const userExists = await this.userRepository.findById(id);

        if (!userExists) {
            throw new AppError("User does not exits");
        }

        const emailExists = await this.userRepository.findByMail(email);

        if (emailExists && emailExists.id !== id) {
            throw new AppError("Email address already used");
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.userRepository.update({
            id,
            name,
            email,
            password: hashedPassword,
        });

        delete user.password;

        return user;
    }
}
