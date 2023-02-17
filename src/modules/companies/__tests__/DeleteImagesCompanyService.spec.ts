import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeUsersRepository } from "@modules/users/repositories/Fakes/FakeUsersRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeContactsRepository } from "../repositories/fakes/FakeContactsRepository";
import { FakeImagesCompanyRepository } from "../repositories/fakes/FakeImagesCompanyRepository";
import { FakeSchedulesRepository } from "../repositories/fakes/FakeSchedulesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { DeleteImagesCompanyService } from "../services/DeleteImagesCompanyService";


let fakeScheduleRepository: ISchedulesRepository;
let fakeUserRepository: IUsersRepository;
let fakeContactRepository: IContactsRepository;
let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let fakeStorageProvider: IStorageProvider;
let deleteImagesCompanyService: DeleteImagesCompanyService;


describe("DeleteImagesCompanyService", () => {
  beforeEach(() => {
    fakeScheduleRepository = new FakeSchedulesRepository();
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeUserRepository = new FakeUsersRepository();
    fakeContactRepository = new FakeContactsRepository();
    fakeImagesCompanyRepository = new FakeImagesCompanyRepository();
    fakeStorageProvider = new FakeStorageProvider();
    deleteImagesCompanyService = new DeleteImagesCompanyService(
      fakeImagesCompanyRepository,
      fakeStorageProvider
    );
  });

  it("Should be able to delete a image company", async () => {
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
      name: "Category Test"
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

    await fakeScheduleRepository.create({
      weekday: "Monday",
      opening_time: "08:00",
      closing_time: "18:00",
      lunch_time: "12:00-13:00",
      company_id: company.id
    });

    const image = await fakeImagesCompanyRepository.create({
      image_name: "image_test.jpg",
      image_url: "http://localhost:3333/companies/image_test.jpg",
      company_id: company.id
    });

    await deleteImagesCompanyService.execute(image.id);

    const findImage = await fakeImagesCompanyRepository.findImageById(image.id);

    expect(findImage).toBe(undefined);
  });

  it("Should not be able to delete a not existing image", async () => {
    await expect(
      deleteImagesCompanyService.execute("not-existing-image")
    ).rejects.toBeInstanceOf(AppError);
  });
});