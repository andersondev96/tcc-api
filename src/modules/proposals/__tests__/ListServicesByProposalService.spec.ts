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
import { FakeServicesProposalsRepository } from "../repositories/fakes/FakeServicesProposalsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { IServicesProposalsRepository } from "../repositories/IServicesProposalsRepository";
import { ListServicesByProposalService } from "../services/ListServicesByProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let fakeServiceRepository: IServicesRepository;
let fakeServiceProposalRepository: IServicesProposalsRepository;
let listServicesByProposalService: ListServicesByProposalService;

describe("ListServicesByProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeServiceProposalRepository = new FakeServicesProposalsRepository();
    listServicesByProposalService = new ListServicesByProposalService(
      fakeProposalRepository,
      fakeServiceProposalRepository
    );
  });

  it("Should be able to list services by proposal", async () => {
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

    const service = await fakeServiceRepository.create({
      name: "New Service",
      description: "New Service Description",
      category: "New Category",
      price: 20,
      company_id: company.id
    });

    const service2 = await fakeServiceRepository.create({
      name: "New Service 2",
      description: "New Service Description 2",
      category: "New Category 2",
      price: 20,
      company_id: company.id
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

    const serviceProposal = await fakeServiceProposalRepository.create({
      customer_id: customer.id,
      proposal_id: proposal.id,
      service_id: service.id
    });

    await fakeServiceProposalRepository.create({
      customer_id: customer.id,
      proposal_id: proposal2.id,
      service_id: service2.id
    });

    const servicesProposals = await listServicesByProposalService.execute(proposal.id);

    expect(servicesProposals).toEqual([serviceProposal]);
  });

  it("Should not be able to list a non existing proposal", async () => {
    await expect(
      listServicesByProposalService.execute("non-existing proposal")
    ).rejects.toBeInstanceOf(AppError);
  });

});