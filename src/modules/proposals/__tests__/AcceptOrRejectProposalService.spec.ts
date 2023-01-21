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
import { AcceptOrRejectProposalService } from "../services/AcceptOrRejectProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let fakeBudgetRepository: IBudgetsRepository;
let acceptOrRejectProposalService: AcceptOrRejectProposalService;

describe("AcceptOrRejectProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeBudgetRepository = new FakeBudgetRepository();
    acceptOrRejectProposalService = new AcceptOrRejectProposalService(
      fakeProposalRepository
    );
  });

  it("Should be able to accept proposal", async () => {
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

    await fakeBudgetRepository.create({
      proposal_id: proposal.id,
      company_id: company.id,
      customer_id: customer.id,
      description: "Description Budget Example",
      delivery_date: new Date(),
      amount: 200.50,
      installments: 2
    });

    const acceptOrRejectProposal = await acceptOrRejectProposalService.execute(proposal.id, "accept");

    expect(acceptOrRejectProposal.status).toEqual("Proposal accepted");
  });

  it("Should be able to reject proposal", async () => {
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

    await fakeBudgetRepository.create({
      proposal_id: proposal.id,
      company_id: company.id,
      customer_id: customer.id,
      description: "Description Budget Example",
      delivery_date: new Date(),
      amount: 200.50,
      installments: 2
    });

    const acceptOrRejectProposal = await acceptOrRejectProposalService.execute(proposal.id, "reject");

    expect(acceptOrRejectProposal.status).toEqual("Proposal rejected");
  });

  it("Should not be able to accept or reject a proposal if response is invalid", async () => {
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

    await fakeBudgetRepository.create({
      proposal_id: proposal.id,
      company_id: company.id,
      customer_id: customer.id,
      description: "Description Budget Example",
      delivery_date: new Date(),
      amount: 200.50,
      installments: 2
    });

    await expect(
      acceptOrRejectProposalService.execute(
        proposal.id,
        "invalid-response")
    ).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be accept or reject a proposal if the proposal not exists", async () => {
    await expect(
      acceptOrRejectProposalService.execute(
        "proposal-not-exist",
        "accept")
    ).rejects.toBeInstanceOf(AppError);
  });
});