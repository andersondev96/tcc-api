import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { DeleteUserService } from "../services/DeleteUserService";

let fakeUsersRepository: IUsersRepository;
let fakeHashProvider: IHashProvider;
let deleteUserService: DeleteUserService;

describe("DeleteUserService", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeHashProvider = new FakeHashProvider();
        deleteUserService = new DeleteUserService(fakeUsersRepository);
    });

    it("Should be able delete to user", async () => {
        const user = await fakeUsersRepository.create({
            name: "John doe",
            email: "john@example.com",
            password: "123456",
        });

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