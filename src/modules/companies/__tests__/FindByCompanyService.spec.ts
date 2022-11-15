import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository"
import { IContactsRepository } from "../repositories/IContactsRepository";
import { FindByCompanyService } from "../services/FindByCompanyService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let findByCompanyService: FindByCompanyService;

describe("FindByCompanyService", () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeContactRepository = new FakeContactsRepository();
        findByCompanyService = new FindByCompanyService(
            fakeCompanyRepository,
            fakeContactRepository
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
            }
        }

        const findCompany = await findByCompanyService.execute(company.id);

        expect(findCompany).toEqual(result);
    })

    it("Should not be able to find by company if company is not exist", async () => {
        await expect(findByCompanyService.execute("id-not-exist")).rejects.toBeInstanceOf(AppError);
    });
})