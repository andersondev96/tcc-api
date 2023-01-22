import { FakeEntrepreneursRepository } from "@modules/companies/repositories/fakes/FakeEntrepreneursRepository";
import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeEntrepreneursSettingsRepository } from "../repositories/Fakes/FakeEntrepreneursSettingsRepository";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";
import { UpdateEntrepreneursSettingsService } from "../services/UpdateEntrepreneursSettingsService";

let fakeUserRepository: IUsersRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeEntrepreneurSettingsRepository: IEntrepreneursSettingsRepository;
let updateEntrepreneursSettingsService: UpdateEntrepreneursSettingsService;

describe("UpdateEntrepreneursSettingsService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    fakeEntrepreneurSettingsRepository = new FakeEntrepreneursSettingsRepository();
    updateEntrepreneursSettingsService = new UpdateEntrepreneursSettingsService(
      fakeEntrepreneurSettingsRepository
    );
  });

  it("Should be able to update a entrepreneur settings", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "12345678"
    });

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id
    });

    const entrepreneurSettings = await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id
    });

    const updateEntrepreneur = await updateEntrepreneursSettingsService.execute({
      entrepreneur_id: entrepreneurSettings.entrepreneur_id,
      service_name_color: "green-400",
      service_price_color: "gray-200",
      card_color: "white",
      highlight_services_quantity: 5,
      online_budget: true,
      online_chat: false,
      email_notification: true
    });

    expect(updateEntrepreneur.service_price_color).toEqual("gray-200");
    expect(updateEntrepreneur.online_budget).toEqual(true);
  });

  it("Should not be able update a not found entrepreneur settings", async () => {
    await expect(updateEntrepreneursSettingsService.execute({
      entrepreneur_id: "non-existing-entrepreneur"
    })
    ).rejects.toBeInstanceOf(AppError);
  });

});