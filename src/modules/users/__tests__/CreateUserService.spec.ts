import { FakeEntrepreneursRepository } from "@modules/companies/repositories/fakes/FakeEntrepreneursRepository";
import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeHashProvider } from "../providers/HashProvider/Fakes/FakeHashProvider";
import { IHashProvider } from "../providers/HashProvider/models/IHashProvider";
import { FakeUsersRepository } from "../repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "../repositories/IUsersRepository";
import { CreateUserService } from "../services/CreateUserService";

let fakeUsersRepository: IUsersRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeHashProvider: IHashProvider;
let createUserService: CreateUserService;


describe("CreateUserService", () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    createUserService = new CreateUserService(
      fakeUsersRepository,
      fakeEntrepreneurRepository,
      fakeHashProvider
    );
  });

  it("Should be able to create a new user", async () => {
    const user = await createUserService.execute({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
      isEntrepreneur: true,
    });

    expect(user).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    const user = await createUserService.execute({
      name: "John doe",
      email: "john@example.com",
      password: "123456",
    });

    await expect(createUserService.execute(user)).rejects.toBeInstanceOf(
      AppError
    );
  });
});
