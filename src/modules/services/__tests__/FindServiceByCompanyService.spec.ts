import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { FindServiceByCompanyService } from "../services/FindServiceByCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeServiceRepository: IServicesRepository;
let findServiceByCompanyService: FindServiceByCompanyService;

describe("FindServiceByCompanyService", () => {

  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeServiceRepository = new FakeServicesRepository();
    findServiceByCompanyService = new FindServiceByCompanyService(
      fakeServiceRepository,
      fakeCompanyRepository
    );
  });

  it("Should be able to find services by company", async () => {
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

    const service1 = await fakeServiceRepository.create({
      name: "Service One",
      description: "Service Description",
      price: 20.0,
      category: "Service Category",
      company_id: company.id
    });

    const service2 = await fakeServiceRepository.create({
      name: "Service Two",
      description: "Service Description 2",
      price: 20.0,
      category: "Service Category 2",
      company_id: company.id
    });

    const findService = await findServiceByCompanyService.execute(company.id);

    expect(findService).toEqual([service1, service2]);

  });

  it("Should not be able to find a service to non existent company", async () => {
    await expect(
      findServiceByCompanyService.execute("non-existent-company"
      )).rejects.toBeInstanceOf(AppError);
  });
});