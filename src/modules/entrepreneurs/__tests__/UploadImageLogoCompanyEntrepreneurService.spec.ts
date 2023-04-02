import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeEntrepreneursRepository } from "../repositories/Fakes/FakeEntrepreneursRepository";
import { FakeEntrepreneursSettingsRepository } from "../repositories/Fakes/FakeEntrepreneursSettingsRepository";
import { IEntrepreneursRepository } from "../repositories/IEntrepreneursRepository";
import { IEntrepreneursSettingsRepository } from "../repositories/IEntrepreneursSettingsRepository";
import { UploadImageLogoCompanyEntrepreneurService } from "../services/UploadImageLogoCompanyEntrepreneurService";


let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeContactRepository: IContactsRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeEntrepreneurSettingsRepository: IEntrepreneursSettingsRepository;
let fakeStorageProvider: IStorageProvider;
let uploadImageLogoCompanyEntrepreneurService: UploadImageLogoCompanyEntrepreneurService;


describe("UploadImageLogoCompanyEntrepreneurService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    fakeEntrepreneurSettingsRepository = new FakeEntrepreneursSettingsRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadImageLogoCompanyEntrepreneurService = new UploadImageLogoCompanyEntrepreneurService(
      fakeEntrepreneurSettingsRepository,
      fakeEntrepreneurRepository,
      fakeStorageProvider
    );
  });

  it("Should be able to upload an image company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "12345678"
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

    await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id,
      highlight_services_quantity: 5,
      online_budget: true,
      online_chat: false,
      email_notification: true
    });

    await uploadImageLogoCompanyEntrepreneurService.execute(
      entrepreneur.id,
      "image_url.png"
    );

    const entrepreneurSettings = await fakeEntrepreneurSettingsRepository.findByEntrepreneur(
      entrepreneur.id
    );

    expect(entrepreneurSettings).toHaveProperty("company_logo");
  });

  it("Should not be able if entrepreneur not found", async () => {

    await expect(uploadImageLogoCompanyEntrepreneurService.execute(
      "entrepreneur-not-exist",
      "logo_image.png"
    )).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able if company not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "12345678"
    });

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id
    });

    await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id,
      highlight_services_quantity: 5,
      online_budget: true,
      online_chat: false,
      email_notification: true
    });

    await expect(uploadImageLogoCompanyEntrepreneurService.execute(
      entrepreneur.id,
      "logo_image.png"
    )).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to upload an image company if image already exits", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "12345678"
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

    await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id,
      highlight_services_quantity: 5,
      online_budget: true,
      online_chat: false,
      email_notification: true,
      company_logo: "image_url.png"
    });

    await uploadImageLogoCompanyEntrepreneurService.execute(
      entrepreneur.id,
      "image_url2.png"
    );

    const entrepreneurSettings = await fakeEntrepreneurSettingsRepository.findByEntrepreneur(
      entrepreneur.id
    );

    expect(entrepreneurSettings.company_logo).toEqual("image_url2.png");
  });
});