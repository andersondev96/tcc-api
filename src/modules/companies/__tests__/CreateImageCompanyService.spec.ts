import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeImagesCompanyRepository } from "../repositories/fakes/FakeImagesCompanyRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { CreateImageCompanyService } from "../services/CreateImageCompanyService";

let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let fakeStorageProvider: IStorageProvider;
let createImageCompanyService: CreateImageCompanyService;

describe("CreateImageCompanyService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeImagesCompanyRepository = new FakeImagesCompanyRepository();
    fakeStorageProvider = new FakeStorageProvider();
    createImageCompanyService = new CreateImageCompanyService(
      fakeCompanyRepository,
      fakeImagesCompanyRepository,
      fakeStorageProvider
    );
  });

  it("Should be able to create a new image company", async () => {
    const category = await fakeCategoryRepository.create({
      name: "Category Test"
    });

    const company = await fakeCompanyRepository.create({
      name: "New Company",
      cnpj: "12345",
      category_id: category.id,
      description: "Description Company",
      services: ["Service 1", "Service 2"],
      contact_id: "contact-id",
      physical_localization: false,
      user_id: "user-id"
    });

    const images = await createImageCompanyService.execute({
      company_id: company.id,
      images_name: ["image1", "image2"]
    });

    expect(images).toBeUndefined();
  });

  it("Should not be able to create a new image if company not exists", async () => {
    await expect(
      createImageCompanyService.execute({
        company_id: "id-not-exist",
        images_name: ["image1", "image2"]
      })

    ).rejects.toBeInstanceOf(AppError);
  });
});