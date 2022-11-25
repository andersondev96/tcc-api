import { AppError } from "@shared/errors/AppError";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IServicesRepository } from "../repositories/IServicesRepository"
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { CreateServiceService } from "../services/CreateServiceService";

let fakeServiceRepository: IServicesRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let createServiceService: CreateServiceService;

describe("CreateServiceService", () => {
    beforeEach(() => {
        fakeServiceRepository = new FakeServicesRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        createServiceService = new CreateServiceService(
            fakeServiceRepository,
            fakeCompanyRepository
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

        const service = await createServiceService.execute({
            name: "Service Example",
            description: "Description Service Example",
            category: "Category Service Example",
            price: 124.40,
            company_id: company.id
        });

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
})  