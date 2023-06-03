import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeCustomersCompaniesRepository } from "@modules/customers/repositories/fakes/FakeCustomersCompaniesRepository";
import { FakeCustomersRepository } from "@modules/customers/repositories/fakes/FakeCustomersRepository";
import { ICustomersCompaniesRepository } from "@modules/customers/repositories/ICustomersCompaniesRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeEntrepreneursRepository } from "@modules/entrepreneurs/repositories/Fakes/FakeEntrepreneursRepository";
import { FakeEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/Fakes/FakeEntrepreneursSettingsRepository";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { FakeMailProvider } from "@shared/container/providers/MailProvider/Fakes/FakeMailProvider";
import { IMailProvider } from "@shared/container/providers/MailProvider/models/IMailProvider";
import { FakeProposalsRepository } from "../repositories/fakes/FakeProposalsRepository";
import { IProposalsRepository } from "../repositories/IProposalsRepository";
import { CreateProposalService } from "../services/CreateProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeCustomerCompanyRepository: ICustomersCompaniesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let fakeEntrepreneurRepository: IEntrepreneursRepository;
let fakeEntrepreneurSettingsRepository: IEntrepreneursSettingsRepository;
let fakeMailProvider: IMailProvider;
let createProposalService: CreateProposalService;

describe("CreateProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeCustomerCompanyRepository = new FakeCustomersCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    fakeEntrepreneurRepository = new FakeEntrepreneursRepository();
    fakeEntrepreneurSettingsRepository = new FakeEntrepreneursSettingsRepository();
    fakeMailProvider = new FakeMailProvider();
    createProposalService = new CreateProposalService(
      fakeUserRepository,
      fakeCompanyRepository,
      fakeCustomerRepository,
      fakeCustomerCompanyRepository,
      fakeEntrepreneurSettingsRepository,
      fakeProposalRepository,
      fakeMailProvider
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

    const category = await fakeCategoryRepository.create({
      name: "Category Test",
      subcategories: "Subcategory Test,Subcategory Test 2"
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

    const entrepreneur = await fakeEntrepreneurRepository.create({
      user_id: user.id,
      company_id: company.id,
    });

    const settings = await fakeEntrepreneurSettingsRepository.create({
      entrepreneur_id: entrepreneur.id,
      email_notification: true
    });

    const customer = await fakeCustomerRepository.create({
      user_id: user.id
    });


    const proposal = await createProposalService.execute({
      objective: "Objective Example",
      time: new Date(),
      description: "Description Example",
      telephone: "(11) 11111111",
      company_id: entrepreneur.company_id,
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

    const category = await fakeCategoryRepository.create({
      name: "Category Test",
      subcategories: "Subcategory Test,Subcategory Test 2"
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