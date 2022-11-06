import AppError from "@shared/errors/AppError";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";

import { IDateProvider } from '../providers/DateProvider/models/IDateProvider';
import { IHashProvider } from '../providers/HashProvider/models/IHashProvider';
import { FakeDateProvider } from "../providers/DateProvider/Fakes/FakeDateProvider";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersTokenRepository } from "../repositories/Fakes/FakeUsersTokenRepository";
import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { RefreshTokenUserService } from "../services/RefreshTokenUserService";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

let refreshTokenUserService: RefreshTokenUserService;
let authenticateUserService: AuthenticateUserService
let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: IHashProvider;
let fakeDateProvider: IDateProvider;
let fakeUsersTokenRepository: FakeUsersTokenRepository;

describe('RefreshTokenUserService', () => {
    beforeEach(() => {
        fakeUsersRepository = new FakeUsersRepository();
        fakeUsersTokenRepository = new FakeUsersTokenRepository();
        fakeHashProvider = new FakeHashProvider();
        fakeDateProvider = new FakeDateProvider();

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

    it('should be able to user token is invalid', async () => {

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

        const refresh_token = await fakeUsersTokenRepository.findByUserAndRefreshToken(
            user.id,
            authentication.refresh_token
        );

        await fakeUsersTokenRepository.deleteById(refresh_token.id);

        await expect(refreshTokenUserService.execute(
            authentication.refresh_token)).rejects.toBeInstanceOf(AppError);
    })
});
