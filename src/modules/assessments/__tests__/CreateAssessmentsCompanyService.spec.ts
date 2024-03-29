import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeCacheProvider } from "@shared/container/providers/CacheProvider/Fakes/FakeCacheProvider";
import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeAssessmentsRepository } from "../repositories/fakes/FakeAssessmentsRepository";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";
import { CreateAssessmentsCompanyService } from "../services/CreateAssessmentsCompanyService";


let createAssessmentsCompanyService: CreateAssessmentsCompanyService;
let fakeAssessmentRepository: IAssessmentsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCacheProvider: ICacheProvider;

describe("CreateAssessmentsCompanyService", () => {
  beforeEach(() => {
    fakeAssessmentRepository = new FakeAssessmentsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCacheProvider = new FakeCacheProvider();
    createAssessmentsCompanyService = new CreateAssessmentsCompanyService(
      fakeAssessmentRepository,
      fakeCompanyRepository,
      fakeUserRepository,
      fakeCacheProvider
    );

  });

  it("Should be able to create a new assessment company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "1234561"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category Test",
      subcategories: "Subcategory Test 1, Subcategory Test 2"
    });

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category_id: category.id,
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const assessment = await createAssessmentsCompanyService.execute({
      user_id: user.id,
      company_id: company.id,
      comment: "This is a new comment",
      stars: 5
    });

    expect(assessment).toHaveProperty("id");

  });

  it("Should not be able to create a new assessment when company not found", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "1234561"
    });

    await expect(createAssessmentsCompanyService.execute({
      user_id: user.id,
      company_id: "not-exist-company",
      comment: "This is a new comment"
    })).rejects.toBeInstanceOf(AppError);
  });
});