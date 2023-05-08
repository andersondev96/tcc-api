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
import { FindServiceByCompanyService } from "../services/FindServiceByCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeServiceRepository: IServicesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let findServiceByCompanyService: FindServiceByCompanyService;

describe("FindServiceByCompanyService", () => {

  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    findServiceByCompanyService = new FindServiceByCompanyService(
      fakeServiceRepository,
      fakeCompanyRepository
    );
  });

  it("Should be able to find services by company", async () => {
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
      subcategories: "Subcategory category 1,Subcategory category 2,Subcategory category 3"
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
      category: "Subcategory category 1",
      image_url: "image_example.png",
      company_id: company.id,
      highlight_service: true
    });

    await fakeServiceRepository.create({
      name: "Service Two",
      description: "Service Description 2",
      price: 20.0,
      category: "Subcategory category 2",
      company_id: company.id
    });

    const findService = await findServiceByCompanyService.execute({
      company_id: company.id,
      name: "Service One",
      category: "Subcategory category One",
      page: 1,
      perPage: 5
    });

    console.log(findService);

    expect(findService).toEqual({
      services: [service],
      totalResults: 1
    });

  });

  it("Should not be able to find a service to non existent company", async () => {
    await expect(
      findServiceByCompanyService.execute({
        company_id: "non-existent-company"
      }
      )).rejects.toBeInstanceOf(AppError);
  });
});