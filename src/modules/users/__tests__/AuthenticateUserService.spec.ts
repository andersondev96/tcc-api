import AppError from '@shared/errors/AppError';
import { ICreateUserDTO } from '../dtos/ICreateUserDTO';

import { DayjsDateProvider } from "../providers/DateProvider/implementations/DayjsDateProvider";
import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { FakeUsersTokenRepository } from "../repositories/Fakes/FakeUsersTokenRepository";
import { UsersRepositoryFake } from "../repositories/Fakes/UsersRepositoryFake";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

let fakeUsersRepository: UsersRepositoryFake;
let fakeTokenUserRepository: FakeUsersTokenRepository;
let fakeHashProvider: FakeHashProvider;
let dateProvider: DayjsDateProvider;
let authenticateUser: AuthenticateUserService;


describe("AuthenticateUser", () => {
  beforeEach(() => {
    fakeUsersRepository = new UsersRepositoryFake();
    fakeTokenUserRepository = new FakeUsersTokenRepository();
    fakeHashProvider = new FakeHashProvider();

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

    console.log(response);

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
