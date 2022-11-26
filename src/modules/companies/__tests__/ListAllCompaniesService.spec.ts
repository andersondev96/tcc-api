import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository"
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ListAllCompaniesService } from "../services/ListAllCompaniesService";

let fakeUserRepository: IUsersRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeContactRepository: IContactsRepository;
let listAllCompaniesService: ListAllCompaniesService;


describe("ListAllCompaniesService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeContactRepository = new FakeContactsRepository();
    listAllCompaniesService = new ListAllCompaniesService(
      fakeCompanyRepository
    );
  });

  it("Should be able to list all companies", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    });

    const company1 = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id,
    });

    const company2 = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id,
    });

    const companies = await listAllCompaniesService.execute();

    expect(companies).toEqual([company1, company2]);

  })
})