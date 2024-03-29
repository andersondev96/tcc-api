import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { GetServiceHighlightService } from "../services/GetServiceHighlightService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeServiceRepository: IServicesRepository;
let getServiceHighlightService: GetServiceHighlightService;

describe("GetServiceHighlightService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    getServiceHighlightService = new GetServiceHighlightService(
      fakeServiceRepository
    );
  });

  it("Should be able to get when service highlight is true", async () => {
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
      category: "Service Category",
      company_id: company.id,
      highlight_service: true
    });


    await getServiceHighlightService.execute(service.id);

    expect(service.highlight_service).toEqual(false);
  });

  it("Should be able to get service highlight", async () => {
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
      category: "Service Category",
      company_id: company.id
    });


    await getServiceHighlightService.execute(service.id);

    expect(service.highlight_service).toEqual(true);
  });

});