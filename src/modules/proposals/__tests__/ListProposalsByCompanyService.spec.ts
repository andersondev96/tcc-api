import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeProposalsRepository } from "../repositories/fakes/FakeProposalsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { ListProposalsByCompanyService } from "../services/ListProposalsByCompanyService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let listProposalsByCompanyService: ListProposalsByCompanyService;

describe("ListProposalsByCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    listProposalsByCompanyService = new ListProposalsByCompanyService(
      fakeCompanyRepository,
      fakeProposalRepository
    );
  });

  it("Should be able to list proposals by company", async () => {
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
      name: "Category Test",
      subcategories: "Subcategory Test 1, Subcategory Test 2"
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

    const proposal = await fakeProposalRepository.create({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      company_id: company.id,
      customer_id: customer.id
    });

    const proposal2 = await fakeProposalRepository.create({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      company_id: company.id,
      customer_id: customer.id
    });

    const listProposals = await listProposalsByCompanyService.execute({
      company_id: company.id,
      page: 1,
      perPage: 10,
      name: "John Doe",
      objective: "Objective Example",
      description: "Description Example"
    });

    expect(listProposals).toEqual({ proposals: [proposal, proposal2], totalResults: 2 });
  });

  it("Should not be able to list proposal if company not found", async () => {
    await expect(
      listProposalsByCompanyService.execute({
        company_id: "not-existing-company",
        page: 1,
        perPage: 10
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});