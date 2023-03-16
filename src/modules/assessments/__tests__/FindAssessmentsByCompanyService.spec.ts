import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


import { FakeAssessmentsRepository } from "../repositories/fakes/FakeAssessmentsRepository";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";
import { FindAssessmentsByCompanyService } from "../services/FindAssessmentsByCompanyService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeContactRepository: IContactsRepository;
let fakeAssessmentRepository: IAssessmentsRepository;
let findAssessmentsByCompanyService: FindAssessmentsByCompanyService;

describe("FindAssessmentsByCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeAssessmentRepository = new FakeAssessmentsRepository();
    findAssessmentsByCompanyService = new FindAssessmentsByCompanyService(
      fakeAssessmentRepository,
      fakeCompanyRepository
    );
  });

  it("Should be able to find assessments to company", async () => {
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

    const assessmentCompany = await fakeAssessmentRepository.create({
      user_id: user.id,
      table_id: company.id,
      comment: "This is a new comment",
      stars: 5
    });

    const findAssessmentsByCompany = await findAssessmentsByCompanyService.execute(assessmentCompany.table_id);

    expect(findAssessmentsByCompany).toEqual([assessmentCompany]);
  });

  it("Should not be able to find a assessment when company not found", async () => {
    await
      expect(findAssessmentsByCompanyService.execute("company-not-exists"))
        .rejects
        .toBeInstanceOf(AppError);
  });
});