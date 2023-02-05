import { FakeEntrepreneursRepository } from "@modules/companies/repositories/fakes/FakeEntrepreneursRepository";
import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FindUserByEntrepreneurService } from "../services/FindUserByEntrepreneurService";

let fakeUserRepository: IUsersRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let findUserByEntrepreneurService: FindUserByEntrepreneurService;

describe("FindUserByEntrepreneurService", () => {

  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    findUserByEntrepreneurService = new FindUserByEntrepreneurService(
      fakeUserRepository,
      fakeEntrepreneurRepository
    );
  });

  it("Should be able to find a entrepreneur by user", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "12345678"
    });

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id
    });

    const findEntrepreneur = await findUserByEntrepreneurService.execute(user.id);


    expect(findEntrepreneur).toEqual(entrepreneur);
  });

  it("Should not able to find a entrepreneur if user not exists", async () => {
    await expect(
      findUserByEntrepreneurService.execute("user not exists")
    ).rejects.toBeInstanceOf(AppError);
  });
});