import { FakeEntrepreneursRepository } from "@modules/entrepreneurs/repositories/Fakes/FakeEntrepreneursRepository";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { FakeServicesRepository } from "@modules/services/repositories/fakes/FakeServicesRepository";
import { FakeEntrepreneursSettingsRepository } from "../repositories/Fakes/FakeEntrepreneursSettingsRepository";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";
import { UpdateEntrepreneursSettingsService } from "../services/UpdateEntrepreneursSettingsService";

let fakeUserRepository: IUsersRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeEntrepreneurSettingsRepository: IEntrepreneursSettingsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeServiceRepository: IServicesRepository;
let updateEntrepreneursSettingsService: UpdateEntrepreneursSettingsService;

describe("UpdateEntrepreneursSettingsService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    fakeEntrepreneurSettingsRepository = new FakeEntrepreneursSettingsRepository();
    updateEntrepreneursSettingsService = new UpdateEntrepreneursSettingsService(
      fakeEntrepreneurRepository,
      fakeEntrepreneurSettingsRepository,
      fakeServiceRepository
    );
  });

  it("Should be able to update a entrepreneur settings", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "12345678"
    });

    const contact = await fakeContactRepository.create({
      email: "business@example.com",
      telephone: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category 1",
      subcategories: "Subcategory category 1,Subcategory category 2,Subcategory category 3"
    });

    const company = await fakeCompanyRepository.create({
      name: "Business name",
      cnpj: "123456",
      category_id: category.id,
      description: "Business Description",
      services: ["Service 1"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    await fakeServiceRepository.create({
      name: "Service One",
      description: "Service Description",
      price: 20.0,
      category: "Subcategory category 1",
      image_url: "image_example.png",
      company_id: company.id
    });

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id
    });

    const entrepreneurSettings = await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id
    });

    const updateEntrepreneur = await updateEntrepreneursSettingsService.execute({
      entrepreneur_id: entrepreneurSettings.entrepreneur_id,
      highlight_services_quantity: 5,
      online_budget: true,
      online_chat: false,
      email_notification: true
    });

    expect(updateEntrepreneur.highlight_services_quantity).toEqual(5);
    expect(updateEntrepreneur.online_budget).toEqual(true);
  });

  it("Should not be able update a not found entrepreneur settings", async () => {
    await expect(updateEntrepreneursSettingsService.execute({
      entrepreneur_id: "non-existing-entrepreneur"
    })
    ).rejects.toBeInstanceOf(AppError);
  });

});