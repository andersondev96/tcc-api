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
import { DeleteProposalService } from "../services/DeleteProposalService";

let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeCustomerRepository: ICustomersRepository;
let fakeProposalRepository: IProposalsRepository;
let deleteProposalService: DeleteProposalService;

describe("DeleteProposalService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeCustomerRepository = new FakeCustomersRepository();
    fakeProposalRepository = new FakeProposalsRepository();
    deleteProposalService = new DeleteProposalService(
      fakeProposalRepository
    );
  });

  it("Should be able to delete a proposal", async () => {
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

    await deleteProposalService.execute(proposal.id);

    const findProposal = await fakeProposalRepository.findProposalById(proposal.id);

    expect(findProposal).toBe(undefined);
  });

  it("Should not be able to delete a non existing proposal", async () => {
    await
      expect(deleteProposalService.execute("not-existing-proposal")
      ).rejects.toBeInstanceOf(AppError);
  });
});