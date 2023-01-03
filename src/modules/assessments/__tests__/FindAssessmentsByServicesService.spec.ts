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
import { FindAssessmentsByServicesService } from "../services/FindAssessmentsByServicesService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeServiceRepository: IServicesRepository;
let fakeContactRepository: IContactsRepository;
let fakeAssessmentRepository: IAssessmentsRepository;
let findAssessmentsByServicesService: FindAssessmentsByServicesService;

describe("FindAssessmentsByServicesService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeAssessmentRepository = new FakeAssessmentsRepository();
    findAssessmentsByServicesService = new FindAssessmentsByServicesService(
      fakeAssessmentRepository,
      fakeServiceRepository
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

    const service = await fakeServiceRepository.create({
      name: "New Service",
      description: "Service description",
      category: "Service Category",
      price: 20,
      company_id: company.id
    });

    const assessmentsService = await fakeAssessmentRepository.create({
      user_id: user.id,
      table_id: service.id,
      comment: "This is a new comment service",
      stars: 5
    });

    const findAssessmentsByCompany = await findAssessmentsByServicesService.execute(assessmentsService.table_id);

    expect(findAssessmentsByCompany).toEqual([assessmentsService]);
  });

  it("Should not be able to find a assessment when service not found", async () => {
    await
      expect(findAssessmentsByServicesService.execute("service-not-exists"))
        .rejects
        .toBeInstanceOf(AppError);
  });
});