import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


import { FakeCustomersCompaniesRepository } from "../repositories/fakes/FakeCustomersCompaniesRepository";
import { FakeCustomersRepository } from "../repositories/fakes/FakeCustomersRepository";
import { ICustomersCompaniesRepository } from "../repositories/ICustomersCompaniesRepository";
import { ICustomersRepository } from "../repositories/ICustomersRepository";
import { ListCustomersByCompanyService } from "../services/ListCustomersByCompanyService";


let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeCustomerCompanyRepository: ICustomersCompaniesRepository;
let fakeCustomerRepository: ICustomersRepository;
let listCustomersByCompanyService: ListCustomersByCompanyService;

describe("ListCustomersByCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeCustomerCompanyRepository = new FakeCustomersCompaniesRepository();
    listCustomersByCompanyService = new ListCustomersByCompanyService(
      fakeCompanyRepository,
      fakeCustomerCompanyRepository
    );
  });

  it("Should be able to list customers by company service", async () => {
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
      subcategories: "Subcategory 1, Subcategory 2"
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

    const customer = await fakeCustomerRepository.create({
      user_id: user.id
    });

    const customerCompany = await fakeCustomerCompanyRepository.create({
      company_id: company.id,
      customer_id: customer.id
    });

    const { customers, totalResults } = await listCustomersByCompanyService.execute({
      company_id: company.id,
      page: 1,
      perPage: 10
    }
    );

    expect(customers).toEqual(customerCompany);

    expect(totalResults).toEqual(1);
  });

  it("Should not be able to list customers by company if company not found", async () => {
    await expect(
      listCustomersByCompanyService.execute({
        company_id: "company-not-exist",
        page: 1,
        perPage: 10
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});