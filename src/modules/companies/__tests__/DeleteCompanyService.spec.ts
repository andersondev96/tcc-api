import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository"
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { FakeImagesCompanyRepository } from "../repositories/fakes/FakeImagesCompanyRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { DeleteCompanyService } from "../services/DeleteCompanyService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let fakeScheduleRepository: ISchedulesRepository;
let fakeAddressRepository: IAddressesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let fakeStorageProvider: IStorageProvider;
let deleteCompanyService: DeleteCompanyService;


describe("DeleteCompanyService", () => {
    beforeEach(() => {
        fakeUserRepository = new FakeUsersRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeScheduleRepository = new FakeSchedulesRepository();
        fakeAddressRepository = new FakeAddressesRepository();
        fakeImagesCompanyRepository = new FakeImagesCompanyRepository();
        fakeStorageProvider = new FakeStorageProvider();
        deleteCompanyService = new DeleteCompanyService(
            fakeCompanyRepository,
            fakeContactRepository,
            fakeScheduleRepository,
            fakeAddressRepository,
            fakeImagesCompanyRepository,
            fakeStorageProvider
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

        await fakeAddressRepository.create({
            cep: "123456",
            street: "Street Test",
            district: "District Test",
            number: 123,
            state: "MG",
            city: "City Test",
            company_id: company.id,
        });

        await fakeImagesCompanyRepository.create({
            image_name: "image_test.png",
            image_url: "http://localhost:3333/companies/image_test.png",
            company_id: company.id,
        });

        await deleteCompanyService.execute(company.id);

        const findCompany = await fakeCompanyRepository.findById(company.id);

        expect(findCompany).toBe(undefined);
    });

    it("Should not be able to delete a not existing company", async () => {
        await expect(
            deleteCompanyService.execute('not-existing-company')
        ).rejects.toBeInstanceOf(AppError);
    });
})