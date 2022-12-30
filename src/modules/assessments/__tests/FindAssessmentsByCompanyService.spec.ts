import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeAssessmentsCompanyRepository } from "../repositories/fakes/FakeAssessmentsCompanyRepository";
import { IAssessmentsCompanyRepository } from "../repositories/IAssessmentsCompanyRepository";
import { FindAssessmentsByCompanyService } from "../services/FindAssessmentsByCompanyService";


let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let fakeAssessmentCompanyRepository: IAssessmentsCompanyRepository;
let findAssessmentsByCompanyService: FindAssessmentsByCompanyService;

describe("FindAssessmentsByCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeAssessmentCompanyRepository = new FakeAssessmentsCompanyRepository();
    findAssessmentsByCompanyService = new FindAssessmentsByCompanyService(
      fakeAssessmentCompanyRepository,
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

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const assessmentCompany = await fakeAssessmentCompanyRepository.create({
      user_id: user.id,
      company_id: company.id,
      comment: "This is a new comment",
      stars: 5
    });

    const findAssessmentsByCompany = await findAssessmentsByCompanyService.execute(assessmentCompany.company_id);

    expect(findAssessmentsByCompany).toEqual([assessmentCompany]);
  });

  it("Should not be able to find a assessment when company not found", async () => {
    await
      expect(findAssessmentsByCompanyService.execute("company-not-exists"))
        .rejects
        .toBeInstanceOf(AppError);
  });
});