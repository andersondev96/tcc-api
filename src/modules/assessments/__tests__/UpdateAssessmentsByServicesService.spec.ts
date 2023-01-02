import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeServicesRepository } from "@modules/services/repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeAssessmentsRepository } from "../repositories/fakes/FakeAssessmentsRepository";
import { IAssessmentsRepository } from "../repositories/IAssessmentsRepository";
import { UpdateAssessmentsByCompanyService } from "../services/UpdateAssessmentsByCompanyService";
import { UpdateAssessmentsByServicesService } from "../services/UpdateAssessmentsByServicesService";


let updateAssessmentsServicesService: UpdateAssessmentsByServicesService;
let fakeAssessmentRepository: IAssessmentsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeServiceRepository: IServicesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;

describe("CreateAssessmentsCompanyService", () => {
  beforeEach(() => {
    fakeAssessmentRepository = new FakeAssessmentsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    updateAssessmentsServicesService = new UpdateAssessmentsByServicesService(
      fakeAssessmentRepository,
      fakeServiceRepository
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

    const service = await fakeServiceRepository.create({
      name: "Service Test",
      description: "Service Test Description",
      price: 20.0,
      category: "Service Category",
      company_id: company.id
    });

    const assessment = await fakeAssessmentRepository.create({
      user_id: user.id,
      table_id: service.id,
      comment: "This is a new comment",
      stars: 5
    });

    const update = await updateAssessmentsServicesService.execute({
      assessment_id: assessment.id,
      comment: "This is a update comment",
      stars: 3
    });

    expect(update.comment).toEqual("This is a update comment");

  });

  it("Should not be able to update a not existing assessment", async () => {
    await expect(updateAssessmentsServicesService.execute({
      assessment_id: "non-existing-assessment",
      comment: "Update Comment",
      stars: 5
    })).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to be update a non existing service", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "1234561"
    });

    const assessment = await fakeAssessmentRepository.create({
      user_id: user.id,
      table_id: "not-exist-service",
      comment: "This is a new comment",
      stars: 5
    });

    await expect(updateAssessmentsServicesService.execute({
      assessment_id: assessment.id,
      comment: "Comment update",
      stars: 5
    })).rejects.toBeInstanceOf(AppError);
  });
});