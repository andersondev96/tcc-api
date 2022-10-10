import AppError from "@shared/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

import { User } from "../infra/prisma/entities/User";
import { IDateProvider } from '../providers/DateProvider/models/IDateProvider';
import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersTokenRepository } from "../repositories/Fakes/FakeUsersTokenRepository";
import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";
import { CreateUserService } from "../services/CreateUserService";
import { RefreshTokenUserService } from "../services/RefreshTokenUserService";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

let createUserService: CreateUserService;
let refreshTokenUserService: RefreshTokenUserService;
let authenticateUserService: AuthenticateUserService
let fakeUsersRepository: UsersRepositoryFake;
let fakeHashProvider: IHashProvider;
let fakeDateProvider: IDateProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;

describe('RefreshTokenUserService', () => {
    beforeEach(() => {
        fakeUsersRepository = new UsersRepositoryFake();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeDateProvider = new DayjsDateProvider();

        createUserService = new CreateUserService(
            fakeUsersRepository,
            fakeHashProvider
        );

        refreshTokenUserService = new RefreshTokenUserService(
            fakeUsersTokenRepository,
            fakeDateProvider
        );

        authenticateUserService = new AuthenticateUserService(
            fakeUsersRepository,
            fakeUsersTokenRepository,
            fakeHashProvider,
            fakeDateProvider
        );
    });

    it("should be able generate a new token", async () => {

        const user: ICreateUserDTO = {
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        };
        await fakeUsersRepository.create(user);

        const authentication = await authenticateUserService.execute({
            email: user.email,
            password: user.password,
        });

        const response = await refreshTokenUserService.execute(
            authentication.refresh_token
        );

        expect(response).toHaveProperty('refresh_token');
    })

    it('should be able to user token does not exists', async () => {

        const authentication = await authenticateUserService.execute({
            email: 'user@example.com',
            password: '12345678',
        });

        expect(refreshTokenUserService.execute(authentication.refresh_token))
            .rejects.toBeInstanceOf(AppError);
    })
});
