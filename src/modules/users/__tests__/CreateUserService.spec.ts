import AppError from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";
import { CreateUserService } from "../services/CreateUserService";

let createUserService: CreateUserService;
let usersRepository: UsersRepositoryFake;
let fakeHashProvider: FakeHashProvider;

describe("CreateUserService", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryFake();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(
            usersRepository,
            fakeHashProvider
        );
    });

    it("Should be able to create a new user", async () => {
        const userData: User = {
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        };

        const user = await createUserService.execute(userData);

        expect(user).toHaveProperty("id");
    });

    it("Should not be able to create an existing user", async () => {
        const userData: User = {
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        };

        const user = await createUserService.execute(userData);

        await expect(createUserService.execute(user)).rejects.toBeInstanceOf(
            AppError
        );
    });
});