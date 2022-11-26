import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeImagesCompanyRepository } from "../repositories/fakes/FakeImagesCompanyRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository"
import { UpdateImagesCompanyService } from "../services/UpdateImagesCompanyService";


let fakeCompanyRepository: ICompaniesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let fakeStorageProvider: IStorageProvider;
let updateImageCompanyService: UpdateImagesCompanyService;

describe("UpdateImagesCompanyService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeImagesCompanyRepository = new FakeImagesCompanyRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateImageCompanyService = new UpdateImagesCompanyService(
      fakeImagesCompanyRepository,
      fakeStorageProvider
    );
  });

  it("Should be able to update a image company", async () => {
    const company = await fakeCompanyRepository.create({
      name: "New Company",
      cnpj: "12345",
      category: "Category Company",
      description: "Description Company",
      services: ["Service 1", "Service 2"],
      contact_id: "contact-id",
      physical_localization: false,
      user_id: "user-id"
    });

    const image = await fakeImagesCompanyRepository.create({
      image_name: "image1.jpg",
      image_url: "localhost://image1.jpg",
      company_id: company.id
    });

    image.image_name = "image2.jpg";

    await updateImageCompanyService.execute(image.id, "image2.jpg");

    expect(image.image_name).toEqual("image2.jpg");
  });

  it("Should not be able to update a non existing image", async () => {
    await expect(
      updateImageCompanyService.execute('non-existing-image', 'image-name'))
      .rejects.toBeInstanceOf(AppError);
  })
})