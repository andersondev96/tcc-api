import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { UpdateServiceService } from "../services/UpdateServiceService";

let fakeServiceRepository: IServicesRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeUserRepository: IUsersRepository;
let updateServiceService: UpdateServiceService;

describe("UpdateServiceService", () => {
  beforeEach(() => {
    fakeServiceRepository = new FakeServicesRepository(),
      fakeCompanyRepository = new FakeCompaniesRepository(),
      fakeContactRepository = new FakeContactsRepository(),
      fakeCategoryRepository = new FakeCategoriesRepository(),
      fakeUserRepository = new FakeUsersRepository(),
      updateServiceService = new UpdateServiceService(
        fakeServiceRepository
      );
  });

  it("Should be able to update the service", async () => {
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
      company_id: company.id
    });

    service.name = "Service Updated";
    service.category = "Category updated";

    await updateServiceService.execute({
      id: service.id,
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category
    });

    expect(service.name).toEqual("Service Updated");
    expect(service.category).toEqual("Category updated");
  });

  it("Should not be able to update a non existing service", async () => {
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
      company_id: company.id
    });

    service.name = "Service Updated";
    service.category = "Category updated";

    await expect(updateServiceService.execute({
      id: "non-existing-service",
      name: service.name,
      description: service.description,
      price: service.price,
      category: service.category
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});