import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { CreateCompanyService } from "../services/CreateCompanyService";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let createCompanyService: CreateCompanyService;

describe('CreateCompanyService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeScheduleRepository = new FakeSchedulesRepository();
        createCompanyService = new CreateCompanyService(
            fakeCompanyRepository,
            fakeUserRepository,
            fakeContactRepository,
            fakeScheduleRepository
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
            schedule_time: {
                day_of_week: "Monday",
                opening_time: "08:00",
                closing_time: "18:00",
                lunch_time: "12:00-13:00",
            },
            physical_localization: true,
            telephone: "1234567",
            email: "business@example.com",
            website: "www.example.com",
            whatsapp: "12345685",
            user_id: user.id,
        });

        expect(company[0]).toHaveProperty(["id"]);
    })
})