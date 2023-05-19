import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeCacheProvider } from "@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { UpdateCompanyService } from "../services/UpdateCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeAddressRepository: IAddressesRepository;
let fakeCacheProvider: ICacheProvider;
let updateCompanyService: UpdateCompanyService;

describe("UpdateCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeAddressRepository = new FakeAddressesRepository();
    fakeCacheProvider = new FakeCacheProvider();
    updateCompanyService = new UpdateCompanyService(
      fakeCompanyRepository,
      fakeCategoryRepository,
      fakeContactRepository,
      fakeAddressRepository,
      fakeCacheProvider
    );
  });

  it("Should be able to update a company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
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

    const address = await fakeAddressRepository.create({
      cep: "35930021",
      street: "Rua Francisco Teles",
      district: "Alvorada",
      number: 27,
      state: "MG",
      city: "João Monlevade",
      latitude: -19.8368,
      longitude: -43.1546,
      company_id: company.id
    });

    company.name = "New name company";
    contact.email = "newemail@example.com";
    address.cep = "03005020";

    const update = await updateCompanyService.execute({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      category_id: category.id,
      description: company.description,
      services: company.services,
      physical_localization: company.physical_localization,
      telephone: contact.telephone,
      whatsapp: contact.whatsapp,
      email: contact.email,
      website: contact.website,
      cep: address.cep,
      number: 123
    });

    expect(update).toHaveProperty("name", "New name company");
    expect(update).toHaveProperty("email", "newemail@example.com");
  });

  it("Should not be able to invalid update company", async () => {

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = {
      id: "not-existing-id",
      name: "Company Test",
      cnpj: "123456",
      category_id: category.id,
      description: "Description Test",
      services: ["Service 1", "Service 2"],
      physical_localization: false,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685"
    };

    await expect(updateCompanyService.execute(company)).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to update if company name already exists", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
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

    const company2 = await fakeCompanyRepository.create({
      name: "Business",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const update = {
      id: company2.id,
      name: company.name,
      cnpj: "123456",
      category_id: category.id,
      description: "Description Test",
      services: ["Service Test"],
      physical_localization: false,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685"
    };

    await expect(updateCompanyService.execute(update)).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to update if category not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
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

    await expect(updateCompanyService.execute({
      id: company.id,
      name: company.name,
      cnpj: "123456",
      category_id: "non-existent-category",
      description: "Description Test",
      services: ["Service Test"],
      physical_localization: true,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      cep: "11111111"
    })).rejects.toBeInstanceOf(AppError);
  });


  it("Should not be able to update if CEP not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
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

    await expect(updateCompanyService.execute({
      id: company.id,
      name: company.name,
      cnpj: "123456",
      category_id: category.id,
      description: "Description Test",
      services: ["Service Test"],
      physical_localization: true,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      cep: "11111111"
    })).rejects.toBeInstanceOf(AppError);

  });

  it("Should be able to update when physical localization is true and has address to company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
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
      physical_localization: true,
      contact_id: contact.id,
      user_id: user.id
    });

    await fakeAddressRepository.create({
      cep: "35930021",
      street: "Rua Francisco Teles",
      district: "Alvorada",
      number: 27,
      state: "MG",
      city: "João Monlevade",
      latitude: -19.8368,
      longitude: -43.1546,
      company_id: company.id
    });

    await updateCompanyService.execute({
      id: company.id,
      name: "Company Update",
      cnpj: "123456",
      category_id: category.id,
      services: ["New Service"],
      description: "New Description",
      physical_localization: company.physical_localization,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      cep: "35930386",
      number: 123
    });

    const companyAddress = await fakeAddressRepository.findAddressByCompany(company.id);

    expect(company.physical_localization).toEqual(true);
    expect(companyAddress.cep).toEqual("35930386");
  });
});