import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { GetFavoritesService } from "../services/GetFavoritesService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeServiceRepository: IServicesRepository;
let getFavoritesService: GetFavoritesService;

describe("GetFavoritesService", () => {
    beforeEach(() => {
        fakeCompanyRepository = new FakeCompaniesRepository();
        fakeUserRepository = new FakeUsersRepository();
        fakeContactRepository = new FakeContactsRepository();
        fakeServiceRepository = new FakeServicesRepository();
        getFavoritesService = new GetFavoritesService(
            fakeServiceRepository,
            fakeUserRepository
        );
    })

    it("Should be able to get favorite", async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john@example.com",
            password: "123456"
        });

        const contact = await fakeContactRepository.create({
            email: "business@example.com",
            telephone: "123456"
        });

        const company = await fakeCompanyRepository.create({
            name: "Business name",
            cnpj: "123456",
            category: "Business Category",
            description: "Business Description",
            services: ["Service 1"],
            physical_localization: false,
            contact_id: contact.id,
            user_id: user.id
        });

        const service = await fakeServiceRepository.create({
            name: "Service One",
            description: "Service Description",
            price: 20.0,
            category: "Service Category",
            company_id: company.id,
            highlight_service: true,
        });

        await getFavoritesService.execute({
            user_id: user.id,
            service_id: service.id
        });

        expect(service.favorites).toEqual(1);

    });

    it("Should be able to get favorite when favorites is different from zero", async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john@example.com",
            password: "123456"
        });

        const contact = await fakeContactRepository.create({
            email: "business@example.com",
            telephone: "123456"
        });

        const company = await fakeCompanyRepository.create({
            name: "Business name",
            cnpj: "123456",
            category: "Business Category",
            description: "Business Description",
            services: ["Service 1"],
            physical_localization: false,
            contact_id: contact.id,
            user_id: user.id
        });

        const service = await fakeServiceRepository.create({
            name: "Service One",
            description: "Service Description",
            price: 20.0,
            category: "Service Category",
            company_id: company.id,
            highlight_service: true,
            favorites: 1
        });

        await getFavoritesService.execute({
            user_id: user.id,
            service_id: service.id
        });

        expect(service.favorites).toEqual(2);

    });

    it("Should not be able to get favorite when service does not exist", async () => {
        const user = await fakeUserRepository.create({
            name: "John Doe",
            email: "john@example.com",
            password: "123456"
        });

        const contact = await fakeContactRepository.create({
            email: "business@example.com",
            telephone: "123456"
        });

        const company = await fakeCompanyRepository.create({
            name: "Business name",
            cnpj: "123456",
            category: "Business Category",
            description: "Business Description",
            services: ["Service 1"],
            physical_localization: false,
            contact_id: contact.id,
            user_id: user.id
        });

        await expect(
            getFavoritesService.execute({
                user_id: user.id,
                service_id: "invalid service"
            })
        ).rejects.toBeInstanceOf(AppError);

    });
})