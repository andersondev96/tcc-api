import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { DeleteServiceService } from "../services/DeleteServiceService";

let fakeServiceRepository: IServicesRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeContactRepository: IContactsRepository;
let fakeUserRepository: IUsersRepository;
let fakeStorageProvider: IStorageProvider;
let deleteServiceService: DeleteServiceService;

describe("DeleteServiceService", () => {
  beforeEach(() => {
    fakeServiceRepository = new FakeServicesRepository(),
      fakeCompanyRepository = new FakeCompaniesRepository(),
      fakeCategoryRepository = new FakeCategoriesRepository(),
      fakeContactRepository = new FakeContactsRepository(),
      fakeUserRepository = new FakeUsersRepository(),
      fakeStorageProvider = new FakeStorageProvider(),
      deleteServiceService = new DeleteServiceService(
        fakeServiceRepository,
        fakeStorageProvider
      );
  });

  it("Should be able to delete the service", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      email: "business@example.com",
      telephone: "123456"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Example",
      subcategories: "Subcategory Example"
    });

    const company = await fakeCompanyRepository.create({
      name: "Business name",
      cnpj: "123456",
      category_id: category.id,
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
      category: "Subcategory Example",
      company_id: company.id,
      image_url: "image_example.jpg"
    });

    await deleteServiceService.execute(service.id);

    const findService = await fakeServiceRepository.findServiceById(service.id);

    expect(findService).toBe(undefined);

  });

  it("Should not be able to delete a not existing service", async () => {
    await expect(
      deleteServiceService.execute("not-existing-service")
    ).rejects.toBeInstanceOf(AppError);
  });
});