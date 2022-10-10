import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";
import { FakeUsersTokenRepository } from "../repositories/Fakes/FakeUsersTokenRepository";
import { SendForgotPasswordMailService } from "../services/SendForgotPasswordMailService";
import { IDateProvider } from "../providers/DateProvider/models/IDateProvider";
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { FakeMailProvider } from "@shared/container/providers/MailProvider/Fakes/FakeMailProvider";
import AppError from "@shared/errors/AppError";

let usersRepositoryFake: UsersRepositoryFake;
let fakeUsersTokenRepository: FakeUsersTokenRepository;
let sendForgotPasswordMailService: SendForgotPasswordMailService;
let fakeDateProvider: IDateProvider;
let fakeMailProvider: IMailProvider;

describe("Send Forgot Password Mail Service", () => {
    beforeEach(() => {
        usersRepositoryFake = new UsersRepositoryFake();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        fakeDateProvider = new DayjsDateProvider();
        fakeMailProvider = new FakeMailProvider();

        sendForgotPasswordMailService = new SendForgotPasswordMailService(
            usersRepositoryFake,
            fakeUsersTokenRepository,
            fakeDateProvider,
            fakeMailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(fakeMailProvider, "sendMail");

        const user = await usersRepositoryFake.create({
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        });

        await sendForgotPasswordMailService.execute(user.email);

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should be able to send an email if user does not exists", async () => {
        await
            expect(sendForgotPasswordMailService.execute("noexists@example.com")
            ).rejects.toEqual(new AppError("User does not exists!"));
    });

    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(fakeUsersTokenRepository, "create");

        const user = await usersRepositoryFake.create({
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        });

        await sendForgotPasswordMailService.execute(user.email);

        expect(generateTokenMail).toBeCalled();
    })
})