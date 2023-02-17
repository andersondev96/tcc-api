import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeEntrepreneursRepository } from "../repositories/fakes/FakeEntrepreneursRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IEntrepreneursRepository } from "../repositories/IEntrepreneursRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { CreateCompanyService } from "../services/CreateCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let fakeAddressRepository: IAddressesRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let createCompanyService: CreateCompanyService;


describe("CreateCompanyService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeScheduleRepository = new FakeSchedulesRepository();
    fakeAddressRepository = new FakeAddressesRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository(),
      createCompanyService = new CreateCompanyService(
        fakeCompanyRepository,
        fakeCategoryRepository,
        fakeUserRepository,
        fakeContactRepository,
        fakeScheduleRepository,
        fakeAddressRepository,
        fakeEntrepreneurRepository
      );
  });

  it("Should be able to create a company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      schedules: [
        {
          "weekday": "Monday",
          "opening_time": "08:00",
          "closing_time": "18:00",
          "lunch_time": "12:00-13:00"
        }
      ],
      physical_localization: true,
      cep: "35910000",
      street: "Street Test",
      district: "District Test",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    });

    const address = await fakeAddressRepository.findAddressByCompany(company.id);

    expect(company).toHaveProperty("id");
    expect(address).toHaveProperty("id");
  });

  it("Should not be able to create a company if this user not exists", async () => {
    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    await expect(
      createCompanyService.execute({
        name: "Business Company",
        cnpj: "123456",
        category_id: category.id,
        description: "Supermarket description",
        services: ["Supermarket", "Shopping"],
        schedules: [
          {
            "weekday": "Monday",
            "opening_time": "08:00",
            "closing_time": "18:00",
            "lunch_time": "12:00-13:00"
          }
        ],
        physical_localization: false,
        telephone: "1234567",
        email: "business@example.com",
        website: "www.example.com",
        whatsapp: "12345685",
        user_id: "user-invalid"
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a company if this company already exists", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const user2 = await fakeUserRepository.create({
      name: "Jan Doe",
      email: "jan.doe@example.com",
      password: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    await createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      schedules: [
        {
          "weekday": "Monday",
          "opening_time": "08:00",
          "closing_time": "18:00",
          "lunch_time": "12:00-13:00"
        }
      ],
      physical_localization: true,
      cep: "57018710",
      street: "Street Test",
      district: "District Test",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    });

    await expect(createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      schedules: [
        {
          "weekday": "Monday",
          "opening_time": "08:00",
          "closing_time": "18:00",
          "lunch_time": "12:00-13:00"
        }
      ],
      physical_localization: true,
      cep: "57018710",
      street: "Street Test",
      district: "District Test",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user2.id
    })).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a company when entrepreneur exists", async () => {
    const user = await fakeUserRepository.create({
      name: "Jan Doe",
      email: "jan.doe@example.com",
      password: "123456"
    });

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    await createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      schedules: [
        {
          "weekday": "Monday",
          "opening_time": "08:00",
          "closing_time": "18:00",
          "lunch_time": "12:00-13:00"
        }
      ],
      physical_localization: true,
      cep: "57018710",
      street: "Street Test",
      district: "District Test",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    });

    const findEntrepreneur = await fakeEntrepreneurRepository.findById(entrepreneur.id);

    expect(findEntrepreneur).toHaveProperty("company_id");


  });

  it("Should not be able to create a company if user has a company", async () => {
    const user = await fakeUserRepository.create({
      name: "Jan Doe",
      email: "jan.doe@example.com",
      password: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    await createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      schedules: [
        {
          "weekday": "Monday",
          "opening_time": "08:00",
          "closing_time": "18:00",
          "lunch_time": "12:00-13:00"
        }
      ],
      physical_localization: true,
      cep: "57018710",
      street: "Street Test",
      district: "District Test",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    });

    await expect(createCompanyService.execute({
      name: "Business Company 2",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      schedules: [
        {
          "weekday": "Monday",
          "opening_time": "08:00",
          "closing_time": "18:00",
          "lunch_time": "12:00-13:00"
        }
      ],
      physical_localization: true,
      cep: "57018710",
      street: "Street Test",
      district: "District Test",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    })).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a company if category not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    await expect(createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: "non-existent-category",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: true,
      cep: "11111111",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    })).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a company if CEP not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    await expect(createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: true,
      cep: "11111111",
      number: 123,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    })).rejects.toBeInstanceOf(AppError);
  });

});