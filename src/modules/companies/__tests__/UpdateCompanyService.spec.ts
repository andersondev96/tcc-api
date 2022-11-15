import { AppError } from "@shared/errors/AppError";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { UpdateCompanyService } from "../services/UpdateCompanyService";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let fakeAddressRepository: IAddressesRepository;
let updateCompanyService: UpdateCompanyService;


describe("UpdateCompanyService", () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeAddressRepository = new FakeAddressesRepository();
        updateCompanyService = new UpdateCompanyService(
            fakeCompanyRepository,
            fakeContactRepository,
            fakeAddressRepository,
        )
    });

    it("Should be able to update a company", async () => {
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

        const address = await fakeAddressRepository.create({
            cep: "123456",
            street: "Street Test",
            district: "District Test",
            number: 123,
            state: "ST",
            city: "City Test",
            company_id: company.id,
        });

        company.name = "New name company";
        contact.email = "newemail@example.com";
        address.street = "Street update";

        const update = await updateCompanyService.execute({
            id: company.id,
            name: company.name,
            cnpj: company.cnpj,
            category: company.category,
            description: company.description,
            services: company.services,
            physical_localization: company.physical_localization,
            telephone: contact.telephone,
            whatsapp: contact.whatsapp,
            email: contact.email,
            website: contact.website,
            address,
        });

        expect(update).toHaveProperty("name", "New name company");
        expect(update).toHaveProperty("email", "newemail@example.com");
        expect(update).toHaveProperty("address.street", "Street update");
    });
})