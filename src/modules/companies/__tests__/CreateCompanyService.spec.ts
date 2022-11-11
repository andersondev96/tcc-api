import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { CreateCompanyService } from "../services/CreateCompanyService";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let createCompanyService: CreateCompanyService;

describe('CreateCompanyService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        createCompanyService = new CreateCompanyService(
            fakeCompanyRepository,
            fakeUserRepository,
            fakeContactRepository
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
            physical_localization: true,
            telephone: "1234567",
            email: "business@example.com",
            website: "www.example.com",
            whatsapp: "12345685",
            user_id: user.id,
        });

        expect(company).toHaveProperty("id");
    })
})