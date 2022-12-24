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
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let fakeAddressRepository: IAddressesRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let createCompanyService: CreateCompanyService;


describe("CreateCompanyService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeScheduleRepository = new FakeSchedulesRepository();
    fakeAddressRepository = new FakeAddressesRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository(),
      createCompanyService = new CreateCompanyService(
        fakeCompanyRepository,
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

    const company = await createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
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
      address:
      {
        "cep": "123456",
        "street": "Street Test",
        "district": "District Test",
        "number": 123,
        "state": "MG",
        "city": "City Test"
      },
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      user_id: user.id
    });

    expect(company).toHaveProperty("id");
  });

  it("Should not be able to create a company if this user not exists", async () => {
    await expect(
      createCompanyService.execute({
        name: "Business Company",
        cnpj: "123456",
        category: "Supermarket",
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

    await createCompanyService.execute({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
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
      user_id: user.id
    });

    await expect(
      createCompanyService.execute({
        name: "Business Company",
        cnpj: "123456",
        category: "Supermarket",
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
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a company if number of services exceeds 3", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    await expect(
      createCompanyService.execute({
        name: "Business Company",
        cnpj: "123456",
        category: "Supermarket",
        description: "Supermarket description",
        services: ["Service 1", "Service 2", "Service 3", "Service 4"],
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
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a company if physical localization is true and address is undefined", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    await expect(
      createCompanyService.execute({
        name: "Business Company",
        cnpj: "123456",
        category: "Supermarket",
        description: "Supermarket description",
        services: ["Service1", "Service2"],
        schedules: [
          {
            "weekday": "Monday",
            "opening_time": "08:00",
            "closing_time": "18:00",
            "lunch_time": "12:00-13:00"
          }
        ],
        physical_localization: true,
        telephone: "1234567",
        email: "business@example.com",
        website: "www.example.com",
        whatsapp: "12345685",
        user_id: user.id
      })
    ).rejects.toBeInstanceOf(AppError);
  });


});