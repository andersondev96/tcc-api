import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { FakeServicesRepository } from "@modules/services/repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeProposalsRepository } from "../repositories/fakes/FakeProposalsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { CreateProposalService } from "../services/CreateProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeServiceRepository: IServicesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let createProposalService: CreateProposalService;

describe("CreateProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    createProposalService = new CreateProposalService(
      fakeUserRepository,
      fakeCompanyRepository,
      fakeCustomerRepository,
      fakeProposalRepository
    );
  });

  it("Should be able to create a proposal when customer already exists", async () => {
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

    await fakeCustomerRepository.create({
      user_id: user.id
    });


    const proposal = await createProposalService.execute({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      telephone: "(11) 11111111",
      company_id: company.id,
      user_id: user.id
    });

    expect(proposal).toHaveProperty("id");
  });

  it("Should be able to create a proposal when customer not exists", async () => {
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

    const proposal = await createProposalService.execute({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      telephone: "(11) 11111111",
      company_id: company.id,
      user_id: user.id
    });

    expect(proposal).toHaveProperty("id");
  });

  it("Should not be able to create a proposal when company not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    await expect(createProposalService.execute({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      telephone: "(11) 11111111",
      company_id: "company-not-exist",
      user_id: user.id
    })
    ).rejects.toBeInstanceOf(AppError);
  });
});