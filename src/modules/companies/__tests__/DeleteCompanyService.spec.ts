import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository"
import { IContactsRepository } from "../repositories/IContactsRepository";
import { DeleteCompanyService } from "../services/DeleteCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let deleteCompanyService: DeleteCompanyService;


describe("DeleteCompanyService", () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        deleteCompanyService = new DeleteCompanyService(
            fakeCompanyRepository
        );
    })

    it("Should be able to delete a company", async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john.doe@example.com",
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
            user_id: user.id
        });

        await deleteCompanyService.execute(company.id);

        const findCompany = await fakeCompanyRepository.findById(company.id);

        expect(findCompany).toBe(undefined);
    })
})