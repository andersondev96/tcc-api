import AppError from '@shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

import { IDateProvider } from '../providers/DateProvider/models/IDateProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { FakeDateProvider } from "../providers/DateProvider/Fakes/FakeDateProvider";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersTokenRepository } from "../repositories/Fakes/FakeUsersTokenRepository";
import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

let fakeUsersRepository: FakeUsersRepository;
let fakeTokenUserRepository: FakeUsersTokenRepository;
let fakeHashProvider: IHashProvider;
let fakeDateProvider: IDateProvider;
let authenticateUser: AuthenticateUserService;


describe("AuthenticateUser", () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeTokenUserRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeDateProvider = new FakeDateProvider();

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeTokenUserRepository,
            fakeHashProvider,
            fakeDateProvider
        );

    })

    it("should be able authenticate", async () => {
        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        };
        await fakeUsersRepository.create(user);

        const response = await authenticateUser.execute({
            email: user.email,
            password: user.password,
        });

        expect(response).toHaveProperty('token');
    });

    it('should not be able to authenticate with non existing user', async () => {
        await expect(
            authenticateUser.execute({
                email: 'joh.doe@example.com',
                password: '123456',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able authenticate with incorrect password', async () => {
        const user = await fakeUsersRepository.create({
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        });

        await expect(
            authenticateUser.execute({
                email: 'john.doe@example.com',
                password: 'wrong-password',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
