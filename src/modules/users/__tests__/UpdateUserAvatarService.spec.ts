import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { CreateUserService } from "../services/CreateUserService";
import { UpdateUserAvatarService } from "../services/UpdateUserAvatarService";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { LocalStorageProvider } from "@shared/container/providers/StorageProvider/implementations/LocalStorageProvider";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

let usersRepositoryFake: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let storageProvider: IStorageProvider;
let createUserService: CreateUserService;
let updateUserAvatarService: UpdateUserAvatarService;

describe("Update User Avatar Service", () => {
    beforeEach(() => {
        usersRepositoryFake = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        storageProvider = new LocalStorageProvider();
        createUserService = new CreateUserService(
            usersRepositoryFake,
            fakeHashProvider
        );

        updateUserAvatarService = new UpdateUserAvatarService(
            usersRepositoryFake,
            storageProvider
        );
    });

    it("Should be able to update user avatar", async () => {
        const userData: ICreateUserDTO = {
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        };

        const user = await createUserService.execute(userData);

        const avatar = await updateUserAvatarService.execute({
            user_id: user.id,
            avatar_url: 'IMG_12345678',

        });

        expect(avatar).toHaveProperty("avatar_url", "IMG_12345678");
    })
})