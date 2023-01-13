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
import { UpdateBudgetService } from "../services/UpdateBudgetService";


let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let fakeBudgetRepository: IBudgetsRepository;
let updateBudgetService: UpdateBudgetService;

describe("UpdateBudgetService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeBudgetRepository = new FakeBudgetRepository();
    updateBudgetService = new UpdateBudgetService(
      fakeBudgetRepository
    );
  });

  it("Should be able to update a budget", async () => {
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

    const update = await updateBudgetService.execute({
      budget_id: budget.id,
      description: "New Description Example Update",
      delivery_date: new Date("2022-01-12"),
      amount: 200,
      installments: 5
    });

    expect(update.description).toEqual("New Description Example Update");
    expect(update.amount).toEqual(200);
  });

  it("Should not be able to update an not existing budget", async () => {
    await expect(updateBudgetService.execute({
      budget_id: "non-existing-budget",
      description: "New Description Example Update",
      delivery_date: new Date("2022-01-12"),
      amount: 200,
      installments: 5
    })).rejects.toBeInstanceOf(AppError);
  });
});
