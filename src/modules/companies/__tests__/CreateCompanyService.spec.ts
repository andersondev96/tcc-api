import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeComapaniesRepository";
import { CreateCompanyService } from "../services/CreateCompanyService";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let createCompanyService: CreateCompanyService;

describe('CreateCompanyService', () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        createCompanyService = new CreateCompanyService(
            fakeCompanyRepository,
            fakeUserRepository,
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
            physical_localization: true,
            user_id: user.id,
        });

        expect(company).toHaveProperty("id");
    })
})