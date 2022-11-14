import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { CreateCompanyService } from "../services/CreateCompanyService";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { AppError } from "@shared/errors/AppError";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let fakeAddressRepository: IAddressesRepository;
let createCompanyService: CreateCompanyService;

describe('CreateCompanyService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeScheduleRepository = new FakeSchedulesRepository();
        fakeAddressRepository = new FakeAddressesRepository();
        createCompanyService = new CreateCompanyService(
            fakeCompanyRepository,
            fakeUserRepository,
            fakeContactRepository,
            fakeScheduleRepository,
            fakeAddressRepository
        );
    })

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
                    "day_of_week": "Monday",
                    "opening_time": "08:00",
                    "closing_time": "18:00",
                    "lunch_time": "12:00-13:00"
                },
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
            user_id: user.id,
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
                        "day_of_week": "Monday",
                        "opening_time": "08:00",
                        "closing_time": "18:00",
                        "lunch_time": "12:00-13:00"
                    },
                ],
                physical_localization: false,
                telephone: "1234567",
                email: "business@example.com",
                website: "www.example.com",
                whatsapp: "12345685",
                user_id: 'user-invalid',
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to create a company if this company already exists", async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "123456"
        });

        const company1 = await createCompanyService.execute({
            name: "Business Company",
            cnpj: "123456",
            category: "Supermarket",
            description: "Supermarket description",
            services: ["Supermarket", "Shopping"],
            schedules: [
                {
                    "day_of_week": "Monday",
                    "opening_time": "08:00",
                    "closing_time": "18:00",
                    "lunch_time": "12:00-13:00"
                },
            ],
            physical_localization: false,
            telephone: "1234567",
            email: "business@example.com",
            website: "www.example.com",
            whatsapp: "12345685",
            user_id: user.id,
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
                        "day_of_week": "Monday",
                        "opening_time": "08:00",
                        "closing_time": "18:00",
                        "lunch_time": "12:00-13:00"
                    },
                ],
                physical_localization: false,
                telephone: "1234567",
                email: "business@example.com",
                website: "www.example.com",
                whatsapp: "12345685",
                user_id: user.id,
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
                services: [],
                schedules: [
                    {
                        "day_of_week": "Monday",
                        "opening_time": "08:00",
                        "closing_time": "18:00",
                        "lunch_time": "12:00-13:00"
                    },
                ],
                physical_localization: false,
                telephone: "1234567",
                email: "business@example.com",
                website: "www.example.com",
                whatsapp: "12345685",
                user_id: user.id,
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
                        "day_of_week": "Monday",
                        "opening_time": "08:00",
                        "closing_time": "18:00",
                        "lunch_time": "12:00-13:00"
                    },
                ],
                physical_localization: true,
                telephone: "1234567",
                email: "business@example.com",
                website: "www.example.com",
                whatsapp: "12345685",
                user_id: user.id,
            })
        ).rejects.toBeInstanceOf(AppError);
    });


})