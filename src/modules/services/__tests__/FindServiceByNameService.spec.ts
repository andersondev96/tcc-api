import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { FindServiceByNameService } from "../services/FindServiceByNameService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeServiceRepository: IServicesRepository;
let findServiceByNameService: FindServiceByNameService;

describe("FindServiceByNameService", () => {

  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeServiceRepository = new FakeServicesRepository();
    findServiceByNameService = new FindServiceByNameService(
      fakeServiceRepository,
      fakeCompanyRepository
    );
  });

  it("Should be able to find service by name", async () => {
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

    const company2 = await fakeCompanyRepository.create({
      name: "Business name 2",
      cnpj: "123456",
      category: "Business Category 2",
      description: "Business Description 2",
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

    await fakeServiceRepository.create({
      name: "Service Two",
      description: "Service Description 2",
      price: 20.0,
      category: "Service Category 2",
      company_id: company2.id
    });

    const findService1 = await findServiceByNameService.execute({
      company_id: company.id,
      name: "vice"
    });

    const findService2 = await findServiceByNameService.execute({
      company_id: company2.id,
      name: "ne"
    });

    expect(findService1).toEqual([service1]);
    expect(findService2).toEqual([]);
  });

  it("Should not be able to find a non existing company", async () => {
    await expect(
      findServiceByNameService.execute({
        company_id: "non-existing-company",
        name: "vice"
      })
    ).rejects.toBeInstanceOf(AppError);
  });
})