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

import { FakeBudgetRepository } from "../repositories/fakes/FakeBudgetsRepository";
import { FakeProposalsRepository } from "../repositories/fakes/FakeProposalsRepository";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { CreateBudgetService } from "../services/CreateBudgetService";


let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let fakeBudgetRepository: IBudgetsRepository;
let createBudgetService: CreateBudgetService;

describe("Create Budget Service", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeBudgetRepository = new FakeBudgetRepository();
    createBudgetService = new CreateBudgetService(
      fakeProposalRepository,
      fakeBudgetRepository
    );
  });

  it("Should be able to create a budget", async () => {
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
      user_id: user.id,
      telephone: "1111111"
    });

    const proposal = await fakeProposalRepository.create({
      company_id: company.id,
      customer_id: customer.id,
      objective: "Objective Example",
      description: "Description Example"
    });

    const budget = await createBudgetService.execute({
      proposal_id: proposal.id,
      description: "Description Budget Example",
      delivery_date: new Date(),
      amount: 200.50,
      installments: 2
    });

    expect(budget).toHaveProperty("id");
  });

  it("Should not be able to create a budget with a non-existing proposal", async () => {
    await expect(
      createBudgetService.execute({
        proposal_id: "non-existing-proposal",
        description: "Description Budget Example",
        delivery_date: new Date(),
        amount: 200.50,
        installments: 2
      })
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a budget if budget already exists", async () => {
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
      user_id: user.id,
      telephone: "1111111"
    });

    const proposal = await fakeProposalRepository.create({
      company_id: company.id,
      customer_id: customer.id,
      objective: "Objective Example",
      description: "Description Example"
    });

    await createBudgetService.execute({
      proposal_id: proposal.id,
      description: "Description Budget Example",
      delivery_date: new Date(),
      amount: 200.50,
      installments: 2
    });

    await expect(
      createBudgetService.execute({
        proposal_id: proposal.id,
        description: "Description Budget Example",
        delivery_date: new Date(),
        amount: 200.50,
        installments: 2
      })
    ).rejects.toBeInstanceOf(AppError);
  });
});