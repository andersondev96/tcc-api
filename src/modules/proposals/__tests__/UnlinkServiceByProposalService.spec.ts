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
import { UnlinkServiceByProposalService } from "../services/UnlinkServiceByProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeServiceRepository: IServicesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeServiceProposalRepository: IServicesProposalsRepository;
let fakeProposalRepository: IProposalsRepository;
let unlinkServiceByProposalService: UnlinkServiceByProposalService;

describe("UnlinkServiceByProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeServiceProposalRepository = new FakeServicesProposalsRepository();
    unlinkServiceByProposalService = new UnlinkServiceByProposalService(
      fakeServiceProposalRepository
    );
  });

  it("Should be able to unlink a service by proposal", async () => {
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

    const linkServiceByProposal = await fakeServiceProposalRepository.create({
      proposal_id: proposal.id,
      customer_id: customer.id,
      service_id: service.id
    });

    await unlinkServiceByProposalService.execute(linkServiceByProposal.id);

    const services = await fakeServiceProposalRepository.listServicesProposalById(proposal.id);

    expect(services).toEqual(undefined);

  });

  it("Should not be able to unlink a not existing service proposal", async () => {
    await expect(
      unlinkServiceByProposalService.execute("non-existing-service-proposal")
    ).rejects.toBeInstanceOf(AppError);
  });
});