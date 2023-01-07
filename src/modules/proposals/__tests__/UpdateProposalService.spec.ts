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
import { FindProposalByIdService } from "../services/FindProposalByIdService";
import { UpdateProposalService } from "../services/UpdateProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let updateProposalService: UpdateProposalService;

describe("UpdateProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    updateProposalService = new UpdateProposalService(
      fakeProposalRepository
    );
  });

  it("Should be able to update a proposal", async () => {
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
      user_id: user.id
    });

    const proposal = await fakeProposalRepository.create({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      company_id: company.id,
      customer_id: customer.id
    });

    const update = await updateProposalService.execute({
      proposal_id: proposal.id,
      objective: "Objective Update",
      time: new Date(),
      description: "Description Update"
    });

    const proposalUpdated = await fakeProposalRepository.findProposalById(update.id);

    expect(proposalUpdated.objective).toEqual("Objective Update");
    expect(proposalUpdated.description).toEqual("Description Update");

  });

  it("Should not be able to update when the proposal not exists", async () => {
    await expect(updateProposalService.execute({
      proposal_id: "proposal-not-exists",
      objective: "Objective Update",
      time: new Date(),
      description: "Description Update"
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});