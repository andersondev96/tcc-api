import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { UpdateUserService } from "../services/UpdateUserService";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import AppError from "@shared/errors/AppError";

let fakeUsersRepository: FakeUsersRepository;
let updateUserService: UpdateUserService;
let fakeHashProvider: FakeHashProvider;

describe("Update User Service", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        updateUserService = new UpdateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

    });

    it("Should be able to update a user", async () => {

        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        };
        const userCreate = await fakeUsersRepository.create(user);

        userCreate.name = "John Doe Updated";
        userCreate.email = "john2@example.com";

        const updatedUser = await updateUserService.execute(user);

        expect(updatedUser).toHaveProperty("name", "John Doe Updated");
        expect(updatedUser).toHaveProperty("email", "john2@example.com");

    });

    it("Should not be able to invalid update user", async () => {
        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
            id: 'invalid-id',
        };

        await expect(updateUserService.execute(user)).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able update user if email already exists", async () => {
        const user1: ICreateUserDTO = {
            name: 'User 1',
            email: 'user1@example.com',
            password: '123456',
        };

        const user2: ICreateUserDTO = {
            name: 'User 2',
            email: 'user2@example.com',
            password: '123456',
        }

        const user1Create = await fakeUsersRepository.create(user1);
        const user2Create = await fakeUsersRepository.create(user2);

        user2Create.email = user1Create.email;

        await expect(updateUserService.execute(user2)).rejects.toBeInstanceOf(AppError);
    })
});