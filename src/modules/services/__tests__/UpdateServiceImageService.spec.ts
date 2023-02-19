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

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { UpdateServiceImageService } from "../services/UpdateServiceImageService";

let fakeServiceRepository: IServicesRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let fakeUserRepository: IUsersRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeStorageProvider: IStorageProvider;
let updateServiceImageService: UpdateServiceImageService;

describe("UpdateServiceImageService", () => {
  beforeEach(() => {
    fakeServiceRepository = new FakeServicesRepository(),
      fakeCompanyRepository = new FakeCompaniesRepository(),
      fakeContactRepository = new FakeContactsRepository(),
      fakeCategoryRepository = new FakeCategoriesRepository(),
      fakeUserRepository = new FakeUsersRepository(),
      fakeStorageProvider = new FakeStorageProvider(),
      updateServiceImageService = new UpdateServiceImageService(
        fakeServiceRepository,
        fakeStorageProvider
      );
  });

  it("Should be able to update the service image", async () => {

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
      name: "Category 1",
      subcategories: "Subcategory 1"
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
      category: "Subcategory 1",
      company_id: company.id,
      image_url: "image_example.jpg"
    });

    await updateServiceImageService.execute({
      service_id: service.id,
      image_url: "image_test.png"
    });

    expect(service.image_url).toEqual("image_test.png");

  });
});