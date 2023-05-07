import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeCustomersRepository } from "../repositories/fakes/FakeCustomersRepository";
import { ICustomersRepository } from "../repositories/ICustomersRepository";
import { ShowCustomerByUserService } from "../services/ShowCustomerByUserService";

let fakeUserRepository: IUsersRepository;
let fakeCustomerRepository: ICustomersRepository;
let showCustomerByUserService: ShowCustomerByUserService;

describe("ShowCustomerByUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    showCustomerByUserService = new ShowCustomerByUserService(
      fakeUserRepository,
      fakeCustomerRepository
    );
  });

  it("Should be able to show a customer by user id", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "jdoe@example.com",
      password: "12345678"
    });

    const customer = await fakeCustomerRepository.create({
      user_id: user.id,
      status: "active",
      telephone: "12345678"
    });

    const showCustomer = await showCustomerByUserService.execute(user.id);

    expect(showCustomer).toEqual({
      ...customer,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        avatar: undefined,
      }
    });
  });

  it("Should not be able to show a customer if user not found", async () => {
    await expect(
      showCustomerByUserService.execute("user-not-exist")
    )
      .rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to show a customer if customer not exist", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "jdoe@example.com",
      password: "12345678"
    });

    await expect(
      showCustomerByUserService.execute(user.id)
    ).
      rejects.toBeInstanceOf(AppError);
  });
});