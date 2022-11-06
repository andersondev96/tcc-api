import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { CreateUserService } from "../services/CreateUserService";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

let usersRepositoryFake: IUsersRepository;
let fakeHashProvider: IHashProvider;
let fakeStorageProvider: IStorageProvider;
let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;

describe("Update User Avatar Service", () => {
    beforeEach(() => {
        usersRepositoryFake = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeStorageProvider = new FakeStorageProvider();
        createUserService = new CreateUserService(
            usersRepositoryFake,
            fakeHashProvider
        );

        updateUserAvatarService = new UpdateUserAvatarService(
            usersRepositoryFake,
            fakeStorageProvider
        );
    });

    it("Should be able to update user avatar", async () => {
        const user = await createUserService.execute({
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatar_url: 'IMG_12345678.jpg',

        });

        expect(user.avatar).toEqual("IMG_12345678.jpg");
    });

    it("should be able to update user avatar when user not exist", async () => {
        const user = await createUserService.execute({
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatar_url: 'image.jpg',

        });

        await updateUserAvatarService.execute({
            user_id: user.id,
            avatar_url: 'IMG_12345678.jpg',
        });


        expect(user.avatar).toEqual('IMG_12345678.jpg');
    });
})