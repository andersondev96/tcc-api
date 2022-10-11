import AppError from "@shared/errors/AppError";
import { hash } from "bcryptjs";
import { inject, injectable } from "tsyringe";
import { IDateProvider } from "../providers/DateProvider/models/IDateProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
export class ResetUserPasswordService {

    constructor(
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {

        const userToken = await this.usersTokenRepository.findByRefreshToken(token);

        if (!userToken) {
            throw new AppError("Token invalid!");
        }

        if (this.dateProvider.compareIsBefore(userToken.expires_date, this.dateProvider.dateNow())) {
            throw new AppError("Token expired!");
        }

        const user = await this.usersRepository.findById(userToken.user_id);

        user.password = await hash(password, 8);

        await this.usersRepository.create(user);

        await this.usersTokenRepository.deleteById(userToken.id);
    }
}