import { XlsxProvider } from "@modules/categories/providers/XlsxProvider/implementations/XlsxProvider";
import { IXlsxProvider } from "@modules/categories/providers/XlsxProvider/models/IXlsxProvider";
import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeCompaniesRepository } from "@modules/companies/repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "@modules/companies/repositories/fakes/FakeContactsRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { FakeServicesRepository } from "../repositories/fakes/FakeServicesRepository";
import { IServicesRepository } from "../repositories/IServicesRepository";
import { ImportServiceService } from "../services/ImportServiceService";


let fakeServiceRepository: IServicesRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeXlsProvider: IXlsxProvider;
let importServiceService: ImportServiceService;

describe("ImportServiceService", () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeServiceRepository = new FakeServicesRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeXlsProvider = new XlsxProvider();
    importServiceService = new ImportServiceService(
      fakeCompanyRepository,
      fakeServiceRepository,
      fakeCategoryRepository,
      fakeXlsProvider
    );
  });

  it("Should be able to import a service", async () => {
    const user = await fakeUserRepository.create({
      name: "John Doe",
      email: "john@example.com",
      password: "123456"
    });

    const contact = await fakeContactRepository.create({
      telephone: "1234567",
      email: "business@example.com",
      website: "www.example.com",
      whatsapp: "12345685"
    });

    const category = await fakeCategoryRepository.create({
      name: "Category 1",
      subcategories: "Subcategory category 1,Subcategory category 2,Subcategory category 3"
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

    const filePath = "services.xlsx";
    const services = [
      { id: "service-1", name: "Service 1", description: "Description 1", price: 100, category: "Subcategory category 1" },
      { id: "service-2", name: "Service 2", description: "Description 2", price: 200, category: "Subcategory category 2" },
      { id: "service-3", name: "Service 3", description: "Description 3", price: 300, category: "Subcategory category 3" }
    ];

    jest.spyOn(fakeXlsProvider, "readXlsxProvider").mockResolvedValue(services);
    jest.spyOn(fakeServiceRepository, "create");

    await importServiceService.execute(company.id, filePath);

    expect(fakeXlsProvider.readXlsxProvider).toHaveBeenCalledWith(filePath);
    expect(fakeServiceRepository.create).toHaveBeenCalledTimes(3);
  });

  it("Should not be able to import a service if category not found", async () => {
    const filePath = "services.xlsx";
    const services = [
      { id: "service-1", name: "Service 1", description: "Description 1", price: 100, category: "Subcategory category 1" },
      { id: "service-2", name: "Service 2", description: "Description 2", price: 200, category: "Subcategory category 2" },
      { id: "service-3", name: "Service 3", description: "Description 3", price: 300, category: "Subcategory category 3" }
    ];

    jest.spyOn(fakeXlsProvider, "readXlsxProvider").mockResolvedValue(services);
    jest.spyOn(fakeServiceRepository, "create");

    await expect(
      importServiceService.execute("non-existing-company", filePath)
    ).rejects.toBeInstanceOf(AppError);
  });
});