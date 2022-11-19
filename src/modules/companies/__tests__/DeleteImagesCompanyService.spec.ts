import { AppError } from "@shared/errors/AppError";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository"
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { DeleteImagesCompanyService } from "../services/DeleteImagesCompanyService";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { FakeImagesCompanyRepository } from "../repositories/fakes/FakeImagesCompanyRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";

let fakeScheduleRepository: ISchedulesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let fakeStorageProvider: IStorageProvider;
let deleteImagesCompanyService: DeleteImagesCompanyService;


describe("DeleteImagesCompanyService", () => {
    beforeEach(() => {
        fakeScheduleRepository = new FakeSchedulesRepository();
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeImagesCompanyRepository = new FakeImagesCompanyRepository();
        fakeStorageProvider = new FakeStorageProvider();
        deleteImagesCompanyService = new DeleteImagesCompanyService(
            fakeImagesCompanyRepository,
            fakeStorageProvider
        );
    });

    it("Should be able to delete a image company", async () => {
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
            lunch_time: "12:00-13:00",
            company_id: company.id,
        });

        const image = await fakeImagesCompanyRepository.create({
            image_name: "image_test.jpg",
            image_url: "http://localhost:3333/companies/image_test.jpg",
            company_id: company.id,
        });

        await deleteImagesCompanyService.execute(image.id);

        const findImage = await fakeImagesCompanyRepository.findImageById(image.id);

        expect(findImage).toBe(undefined);
    });

    it("Should not be able to delete a not existing image", async () => {
        await expect(
            deleteImagesCompanyService.execute('not-existing-image')
        ).rejects.toBeInstanceOf(AppError);
    })
})