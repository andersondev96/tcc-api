import { inject, injectable } from "tsyringe";
import { v4 as uuidV4 } from "uuid";

import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import AppError from "@shared/errors/AppError";

import { IDateProvider } from "../providers/DateProvider/models/IDateProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../repositories/IUsersTokenRepository";

@injectable()
export class SendForgotPasswordMailService {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokenRepository")
        private usersTokenRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("EtherealMailProvider")
        private mailProvider: IMailProvider
    ) { }

    async execute(email: string) {
        const user = await this.usersRepository.findByMail(email);

        if (!user) {
            throw new AppError("User does not exists!");
        }

        const token = uuidV4();

        const expires_date = this.dateProvider.addHours(3);

        await this.usersTokenRepository.create({
            refresh_token: token,
            user_id: user.id,
            expires_date,
        });

        await this.mailProvider.sendMail(
            email,
            "Recuperação de senha",
            `O link par o reset é ${token}}`
        );
    }
}

