import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeEntrepreneursRepository } from "@modules/entrepreneurs/repositories/Fakes/FakeEntrepreneursRepository";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeEntrepreneursSettingsRepository } from "../repositories/Fakes/FakeEntrepreneursSettingsRepository";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";
import { ShowSettingEntrepreneurUserService } from "../services/ShowSettingEntrepreneurUserService";


let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeContactRepository: IContactsRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeEntrepreneurSettingsRepository: IEntrepreneursSettingsRepository;
let showSettingEntrepreneurUserService: ShowSettingEntrepreneurUserService;

describe("ShowSettingEntrepreneurUserService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    fakeEntrepreneurSettingsRepository = new FakeEntrepreneursSettingsRepository();
    showSettingEntrepreneurUserService = new ShowSettingEntrepreneurUserService(
      fakeEntrepreneurSettingsRepository,
      fakeEntrepreneurRepository,
      fakeUserRepository
    );
  });

  it("Should be able to show settings entrepreneur company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id,
      company_id: company.id
    });

    const entrepreneurSettings = await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id,
      highlight_services_quantity: 5,
      online_budget: true,
      online_chat: false,
      email_notification: true
    });

    const showSettings = await showSettingEntrepreneurUserService.execute(
      user.id
    );

    expect(showSettings).toEqual(entrepreneurSettings);
  });

  it("Should not be able to how settings entrepreneur company if user not found", async () => {
    await expect(showSettingEntrepreneurUserService.execute(
      "user-not-exist"
    )).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to how settings entrepreneur company if entrepreneur not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    await expect(showSettingEntrepreneurUserService.execute(
      user.id
    )).rejects.toBeInstanceOf(AppError);
  });
});