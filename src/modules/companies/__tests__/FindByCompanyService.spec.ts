import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository"
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { FindByCompanyService } from "../services/FindByCompanyService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let fakeAddressRepository: IAddressesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let findByCompanyService: FindByCompanyService;

describe("FindByCompanyService", () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeScheduleRepository = new FakeSchedulesRepository();
        fakeAddressRepository = new FakeAddressesRepository();
        findByCompanyService = new FindByCompanyService(
            fakeCompanyRepository,
            fakeContactRepository,
            fakeScheduleRepository,
            fakeAddressRepository
        );
    });

    it("Should be able to find by company", async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john@example.com",
            password: "123456"
        });

        const contact = await fakeContactRepository.create({
            telephone: "1234567",
            email: "business@example.com",
            website: "www.example.com",
            whatsapp: "12345685",
        });

        const company = await fakeCompanyRepository.create({
            name: "Business Company",
            cnpj: "123456",
            category: "Supermarket",
            description: "Supermarket description",
            services: ["Supermarket", "Shopping"],
            physical_localization: false,
            contact_id: contact.id,
            user_id: user.id,
        });

        const schedule = await fakeScheduleRepository.create({
            day_of_week: "Monday",
            opening_time: "08:00",
            closing_time: "18:00",
            company_id: company.id
        });

        const address = await fakeAddressRepository.create({
            cep: "123456",
            street: "Street Test",
            district: "District Test",
            number: 123,
            state: "ST",
            city: "City Test",
            company_id: company.id,
        });

        const result = {
            company: {
                name: 'Business Company',
                cnpj: '123456',
                category: 'Supermarket',
                description: 'Supermarket description',
                services: ['Supermarket', 'Shopping'],
                physical_localization: false,
                contact_id: contact.id,
                user_id: user.id,
                id: company.id
            },
            contact: {
                telephone: contact.telephone,
                email: contact.email,
                website: contact.website,
                whatsapp: contact.whatsapp,
                id: contact.id
            },
            schedules: [
                {
                    day_of_week: 'Monday',
                    opening_time: '08:00',
                    closing_time: '18:00',
                    company_id: company.id,
                    id: schedule.id,
                }
            ],
            address: {
                cep: '123456',
                street: 'Street Test',
                district: 'District Test',
                number: 123,
                state: 'ST',
                city: 'City Test',
                company_id: company.id,
                id: address.id,
            }

        }

        const findCompany = await findByCompanyService.execute(company.id);

        expect(findCompany).toEqual(result);
    })

    it("Should not be able to find by company if company is not exist", async () => {
        await expect(findByCompanyService.execute("id-not-exist")).rejects.toBeInstanceOf(AppError);
    });
})