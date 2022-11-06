import AppError from "@shared/errors/AppError";

import { User } from "../infra/prisma/entities/User";
import { DeleteUserService } from "../services/DeleteUserService";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";


let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let deleteUserService: DeleteUserService;

describe("DeleteUserService", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        deleteUserService = new DeleteUserService(fakeUsersRepository);
    });

    it("Should be able delete to user", async () => {
        const userData: User = {
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        };

        const user = await fakeUsersRepository.create(userData);

        await deleteUserService.execute(user.id);

        const findUser = await fakeUsersRepository.findById(user.id);

        expect(findUser).toBe(undefined);
    });

    it("Should not be able to delete a invalid user", async () => {

        await expect(deleteUserService.execute('invalid-id')).rejects.toBeInstanceOf(
            AppError
        );
    });


})