import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeAddressesRepository } from "../repositories/fakes/FakeAddressesRepository";
import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { UpdateCompanyService } from "../services/UpdateCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeAddressRepository: IAddressesRepository;
let updateCompanyService: UpdateCompanyService;

describe("UpdateCompanyService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeAddressRepository = new FakeAddressesRepository();
    updateCompanyService = new UpdateCompanyService(
      fakeCompanyRepository,
      fakeContactRepository,
      fakeAddressRepository,
    )
  });

  it("Should be able to update a company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
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

    const address = await fakeAddressRepository.create({
      cep: "123456",
      street: "Street Test",
      district: "District Test",
      number: 123,
      state: "ST",
      city: "City Test",
      company_id: company.id,
    });

    company.name = "New name company";
    contact.email = "newemail@example.com";
    address.street = "Street update";

    const update = await updateCompanyService.execute({
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      category: company.category,
      description: company.description,
      services: company.services,
      physical_localization: company.physical_localization,
      telephone: contact.telephone,
      whatsapp: contact.whatsapp,
      email: contact.email,
      website: contact.website,
      address,
    });

    expect(update).toHaveProperty("name", "New name company");
    expect(update).toHaveProperty("email", "newemail@example.com");
    expect(update).toHaveProperty("address.street", "Street update");
  });

  it("Should not be able to invalid update company", async () => {

    const company = {
      id: 'not-existing-id',
      name: "Company Test",
      cnpj: "123456",
      category: "Category Test",
      description: "Description Test",
      services: ["Service 1", "Service 2"],
      physical_localization: false,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    }

    await expect(updateCompanyService.execute(company)).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to update if company name already exists", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
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

    const company2 = await fakeCompanyRepository.create({
      name: "Business",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: false,
      contact_id: contact.id,
      user_id: user.id
    });

    const update = {
      id: company2.id,
      name: company.name,
      cnpj: "123456",
      category: "Category Test",
      description: "Description Test",
      services: ["Service Test"],
      physical_localization: false,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    }

    await expect(updateCompanyService.execute(update)).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to update company if services equal to zero", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
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

    const update = {
      id: company.id,
      name: "Company Test",
      cnpj: "123456",
      category: "Category Test",
      description: "Description Test",
      services: [],
      physical_localization: false,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    }

    await expect(updateCompanyService.execute(update)).rejects.toBeInstanceOf(AppError);

  });

  it("Should not be able to update when physical localization is true and address is undefined", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    });

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: true,
      contact_id: contact.id,
      user_id: user.id
    });

    const update = {
      id: company.id,
      name: "Company Test",
      cnpj: "123456",
      category: "Category Test",
      description: "Description Test",
      services: ["Service 1", "Service 2"],
      physical_localization: true,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    }

    await expect(updateCompanyService.execute(update)).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to update when physical localization is true and don't has address to company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
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

    company.physical_localization = true;

    const updatedCompany = await updateCompanyService.execute({
      id: company.id,
      name: "Company Update",
      cnpj: "123456",
      category: "New Category",
      services: ["New Service"],
      description: "New Description",
      physical_localization: company.physical_localization,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      address: {
        cep: "123456",
        street: "Street Test",
        district: "District Test",
        number: 123,
        state: "ST",
        city: "City Test",
        company_id: company.id,
      }
    });

    expect(company.physical_localization).toEqual(true);
    expect(updatedCompany).toHaveProperty("address");
  })

  it("Should be able to update when physical localization is true and has address to company", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
    });

    const company = await fakeCompanyRepository.create({
      name: "Business Company",
      cnpj: "123456",
      category: "Supermarket",
      description: "Supermarket description",
      services: ["Supermarket", "Shopping"],
      physical_localization: true,
      contact_id: contact.id,
      user_id: user.id
    });

    const address = await fakeAddressRepository.create({
      cep: "123456",
      street: "Street Test",
      district: "District Test",
      number: 123,
      state: "ST",
      city: "City Test",
      company_id: company.id,
    });

    const updatedCompany = await updateCompanyService.execute({
      id: company.id,
      name: "Company Update",
      cnpj: "123456",
      category: "New Category",
      services: ["New Service"],
      description: "New Description",
      physical_localization: company.physical_localization,
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685",
      address
    });

    expect(company.physical_localization).toEqual(true);
    expect(updatedCompany).toHaveProperty("address");
  })
})