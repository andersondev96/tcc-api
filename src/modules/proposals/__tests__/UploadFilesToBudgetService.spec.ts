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
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeBudgetRepository } from "../repositories/fakes/FakeBudgetsRepository";
import { FakeProposalsRepository } from "../repositories/fakes/FakeProposalsRepository";
import { IBudgetsRepository } from "../repositories/IBudgetsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { UploadFilesToBudgetService } from "../services/UploadFilesToBudgetService";


let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let fakeBudgetRepository: IBudgetsRepository;
let fakeStorageProvider: IStorageProvider;
let uploadFilesToBudgetService: UploadFilesToBudgetService;

describe("UploadFilesToBudgetService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeBudgetRepository = new FakeBudgetRepository();
    fakeStorageProvider = new FakeStorageProvider();
    uploadFilesToBudgetService = new UploadFilesToBudgetService(
      fakeBudgetRepository,
      fakeStorageProvider
    );
  });

  it("Should be able to upload files to budget", async () => {
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

    const budget = await fakeBudgetRepository.create({
      proposal_id: proposal.id,
      company_id: company.id,
      customer_id: customer.id,
      description: "Description Budget Example",
      delivery_date: new Date(),
      amount: 200.50,
      installments: 2
    });

    await uploadFilesToBudgetService.execute({
      budget_id: budget.id,
      budget_files: ["file1", "file2"]
    });

    const findBudget = await fakeBudgetRepository.findBudgetById(budget.id);

    expect(findBudget.files).toEqual(["file1", "file2"]);
  });

  it("Should not be able to upload files to budget if budget not found", async () => {
    await expect(uploadFilesToBudgetService.execute({
      budget_id: "not-existing-budget",
      budget_files: ["file1", "file2"]
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});