import AppError from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { CreateUserService } from "../services/CreateUserService";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";
import { FindByUserIdService } from "../services/FindByUserIdService";


let createUserService: CreateUserService;
let usersRepository: UsersRepositoryFake;
let fakeHashProvider: FakeHashProvider;
let findByUserIdService: FindByUserIdService;

describe("DeleteUserService", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryFake();
        fakeHashProvider = new FakeHashProvider();
        createUserService = new CreateUserService(usersRepository, fakeHashProvider);
        findByUserIdService = new FindByUserIdService(usersRepository);
    });

    it("Should be able find to user", async () => {
        const userData: User = {
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        };

        const user = await createUserService.execute(userData);

        const findUser = await findByUserIdService.execute(user.id);

        expect(findUser).toEqual(user);
    });

    it("Should not be able find to invalid user", async () => {

        await expect(findByUserIdService.execute('invalid-id')).rejects.toBeInstanceOf(
            AppError
        );
    });

})