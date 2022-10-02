import AppError from '@shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

import { IDateProvider } from '../providers/DateProvider/models/IDateProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersTokenRepository } from "../repositories/Fakes/FakeUsersTokenRepository";
import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";
import { AuthenticateUserService } from "../services/AuthenticateUserService";
import { CreateUserService } from '../services/CreateUserService';

let fakeUsersRepository: UsersRepositoryFake;
let fakeTokenUserRepository: FakeUsersTokenRepository;
let fakeHashProvider: IHashProvider;
let dateProvider: IDateProvider;
let authenticateUser: AuthenticateUserService;
let createUserService: CreateUserService;


describe("AuthenticateUser", () => {
    beforeEach(() => {
        fakeUsersRepository = new UsersRepositoryFake();
        fakeTokenUserRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        dateProvider = new DayjsDateProvider();

        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider,
        );

        authenticateUser = new AuthenticateUserService(
            fakeUsersRepository,
            fakeTokenUserRepository,
            fakeHashProvider,
            dateProvider
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
