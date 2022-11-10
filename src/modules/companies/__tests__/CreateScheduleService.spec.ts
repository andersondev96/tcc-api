import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeComapaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { CreateScheduleService } from "../services/CreateScheduleService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeScheduleRepository: ISchedulesRepository;
let createScheduleService: CreateScheduleService;

describe("CreateScheduleService", () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeScheduleRepository = new FakeSchedulesRepository();
        createScheduleService = new CreateScheduleService(
            fakeScheduleRepository,
            fakeCompanyRepository
        );
    })

    it("Should be able to create a schedule", async () => {

        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john.doe@example.com",
            password: "123456"
        });

        const contact = await fakeContactRepository.create({
            email: "business@example.com",
            telephone: "1234567",
            whatsapp: "12345685",
            website: "www.example.com",
        });

        const company = await fakeCompanyRepository.create({
            name: "Business Company",
            cnpj: "123456",
            category: "Supermarket",
            description: "Supermarket description",
            physical_localization: true,
            contact_id: contact.id,
            user_id: user.id,
        });

        const schedule = await createScheduleService.execute({
            day_of_week: "Monday",
            opening_time: "08:00",
            closing_time: "18:00",
            company_id: company.id,
        });

        expect(schedule).toHaveProperty("id");
    })
})