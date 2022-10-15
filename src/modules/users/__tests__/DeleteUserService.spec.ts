import AppError from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { CreateUserService } from "../services/CreateUserService";
import { DeleteUserService } from "../services/DeleteUserService";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";


let createUserService: CreateUserService;
let usersRepository: UsersRepositoryFake;
let fakeHashProvider: FakeHashProvider;
let deleteUserService: DeleteUserService;

describe("DeleteUserService", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryFake();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(usersRepository, fakeHashProvider);
        deleteUserService = new DeleteUserService(usersRepository);
    });

    it("Should be able delete to user", async () => {
        const userData: User = {
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        };

        const user = await createUserService.execute(userData);

        await deleteUserService.execute(user.id);

        const findUser = await usersRepository.findById(user.id);

        expect(findUser).toBe(undefined);
    });

    it("Should not be able to delete a invalid user", async () => {

        await expect(deleteUserService.execute('invalid-id')).rejects.toBeInstanceOf(
            AppError
        );
    });


})