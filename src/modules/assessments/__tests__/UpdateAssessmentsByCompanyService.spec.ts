import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeAssessmentsRepository } from "../repositories/fakes/FakeAssessmentsRepository";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";
import { UpdateAssessmentsByCompanyService } from "../services/UpdateAssessmentsByCompanyService";


let updateAssessmentsCompanyService: UpdateAssessmentsByCompanyService;
let fakeAssessmentRepository: IAssessmentsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;

describe("CreateAssessmentsCompanyService", () => {
  beforeEach(() => {
    fakeAssessmentRepository = new FakeAssessmentsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    updateAssessmentsCompanyService = new UpdateAssessmentsByCompanyService(
      fakeAssessmentRepository,
      fakeCompanyRepository
    );

  });

  it("Should be able to update a assessment company", async () => {
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

    const assessment = await fakeAssessmentRepository.create({
      user_id: user.id,
      table_id: company.id,
      comment: "This is a new comment",
      stars: 5
    });

    const update = await updateAssessmentsCompanyService.execute({
      assessment_id: assessment.id,
      comment: "This is a update comment",
      stars: 3
    });

    console.log(update);

    expect(update.comment).toEqual("This is a update comment");

  });

  it("Should not be able to update a not existing assessment company", async () => {
    await expect(updateAssessmentsCompanyService.execute({
      assessment_id: "not-exist-assessment",
      comment: "This is a update comment"
    })).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to update a not existing company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "1234561"
    });

    const assessment = await fakeAssessmentRepository.create({
      user_id: user.id,
      table_id: "not-exist-company",
      comment: "This is a new comment",
      stars: 5
    });

    await expect(updateAssessmentsCompanyService.execute({
      assessment_id: assessment.id,
      comment: "Comment update",
      stars: 5
    })).rejects.toBeInstanceOf(AppError);
  });
});