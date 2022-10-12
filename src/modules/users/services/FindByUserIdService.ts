import { inject, injectable } from "tsyringe";

import AppError from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { User } from "../infra/prisma/entities/User";


@injectable()
export class FindByUserIdService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) { }

    async execute(user_id: string): Promise<User> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("User not exists");
        }

        return user;
    }
}