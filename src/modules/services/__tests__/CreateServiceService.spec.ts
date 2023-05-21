import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeEntrepreneursRepository } from "@modules/entrepreneurs/repositories/Fakes/FakeEntrepreneursRepository";
import { FakeEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/Fakes/FakeEntrepreneursSettingsRepository";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { CreateServiceService } from "../services/CreateServiceService";

let fakeServiceRepository: IServicesRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeUserRepository: IUsersRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeEntrepreneurSettingsRepository: IEntrepreneursSettingsRepository;
let fakeContactRepository: IContactsRepository;
let createServiceService: CreateServiceService;

describe("CreateServiceService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    fakeEntrepreneurSettingsRepository = new FakeEntrepreneursSettingsRepository();
    createServiceService = new CreateServiceService(
      fakeServiceRepository,
      fakeCategoryRepository,
      fakeCompanyRepository,
      fakeEntrepreneurSettingsRepository
    );
  });

  it("Should be able to create a new service", async () => {
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
      name: "Category 1",
      subcategories: "Subcategory category 1"
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

    const service = await createServiceService.execute({
      name: "Service Example",
      description: "Description Service Example",
      category: "Subcategory category 1",
      price: 124.40,
      company_id: company.id
    });

    console.log(service);

    expect(service).toHaveProperty("id");
  });

  it("Should not be able to create a service with a non existing company", async () => {
    await expect(createServiceService.execute({
      name: "Service Example",
      description: "Description Service Example",
      category: "Category Service Example",
      price: 124.40,
      company_id: "non-existing-company"
    })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new service if category not found", async () => {
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
      name: "Category 1",
      subcategories: "Subcategory category 1,Subcategory category 2,Subcategory category 3"
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

    await expect(createServiceService.execute({
      name: "Service Example",
      description: "Description Service Example",
      category: "Subcategory category ",
      price: 124.40,
      company_id: company.id
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});  