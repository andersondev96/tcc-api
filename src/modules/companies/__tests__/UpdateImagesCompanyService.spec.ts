import { FakeCategoriesRepository } from "@modules/categories/repositories/fakes/FakeCategoriesRepository";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { FakeStorageProvider } from "@shared/container/providers/StorageProvider/fakes/FakerStorageProvider";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { FakeCompaniesRepository } from "../repositories/fakes/FakeCompaniesRepository";
import { FakeImagesCompanyRepository } from "../repositories/fakes/FakeImagesCompanyRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { UpdateImagesCompanyService } from "../services/UpdateImagesCompanyService";


let fakeCompanyRepository: ICompaniesRepository;
let fakeCategoryRepository: ICategoriesRepository;
let fakeImagesCompanyRepository: IImagesCompanyRepository;
let fakeStorageProvider: IStorageProvider;
let updateImageCompanyService: UpdateImagesCompanyService;

describe("UpdateImagesCompanyService", () => {
  beforeEach(() => {
    fakeCompanyRepository = new FakeCompaniesRepository();
    fakeCategoryRepository = new FakeCategoriesRepository();
    fakeImagesCompanyRepository = new FakeImagesCompanyRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateImageCompanyService = new UpdateImagesCompanyService(
      fakeCompanyRepository,
      fakeImagesCompanyRepository,
      fakeStorageProvider
    );
  });

  it("Should be able to update an image company", async () => {

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

    const images = [
      {
        image_name: "image1.jpg",
        image_url: "http://localhost:3333/company/image1.jpg",
        company_id: company.id
      },
      {
        image_name: "image2.jpg",
        image_url: "http://localhost:3333/company/image2.jpg",
        company_id: company.id
      },
      {
        image_name: "image3.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      }
    ];

    await Promise.all(
      images.map(image => fakeImagesCompanyRepository.create(image))
    );

    const imagesUpdated = ["image1updated.jpg", "image2updated.jpg", "image3updated.jpg"];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    const findImage1 = updateImages.find(imageName => imageName.image_name === "image1updated.jpg");
    const findImage2 = updateImages.find(imageName => imageName.image_name === "image2updated.jpg");
    const findImage3 = updateImages.find(imageName => imageName.image_name === "image3updated.jpg");

    expect(findImage1.image_url).toEqual("http://localhost:3333/company/image1updated.jpg");
    expect(findImage2.image_url).toEqual("http://localhost:3333/company/image2updated.jpg");
    expect(findImage3.image_url).toEqual("http://localhost:3333/company/image3updated.jpg");
  });

  it("Should be able to remove images on company", async () => {

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

    const images = [
      {
        image_name: "image1.jpg",
        image_url: "http://localhost:3333/company/image1.jpg",
        company_id: company.id
      },
      {
        image_name: "image2.jpg",
        image_url: "http://localhost:3333/company/image2.jpg",
        company_id: company.id
      },
      {
        image_name: "image3.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      },
      {
        image_name: "image4.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      },
      {
        image_name: "image5.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      },
      {
        image_name: "image6.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      }
    ];

    await Promise.all(
      images.map(image => fakeImagesCompanyRepository.create(image))
    );

    const imagesUpdated = ["image1updated.jpg", "image2updated.jpg", "image3updated.jpg"];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    expect(updateImages.length).toEqual(3);
  });

  it("Should be able to add new images on company", async () => {

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

    const images = [
      {
        image_name: "image1.jpg",
        image_url: "http://localhost:3333/company/image1.jpg",
        company_id: company.id
      },
      {
        image_name: "image2.jpg",
        image_url: "http://localhost:3333/company/image2.jpg",
        company_id: company.id
      },
      {
        image_name: "image3.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      },
      {
        image_name: "image4.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: company.id
      }
    ];

    await Promise.all(
      images.map(image => fakeImagesCompanyRepository.create(image))
    );

    const imagesUpdated = [
      "image1updated.jpg", "image2updated.jpg", "image3updated.jpg", "image4updated.jpg", "image5.jpg", "image6.jpg"
    ];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    expect(updateImages.length).toEqual(6);
    const findImage5 = updateImages.find((image) => image.image_name === "image5.jpg");
    const findImage6 = updateImages.find((image) => image.image_name === "image6.jpg");

    expect(findImage5.image_url).toEqual("http://localhost:3333/company/image5.jpg");
    expect(findImage6.image_url).toEqual("http://localhost:3333/company/image6.jpg");
  });

  it("Should not be able to update images if company not found", async () => {

    const images = [
      {
        image_name: "image1.jpg",
        image_url: "http://localhost:3333/company/image1.jpg",
        company_id: "company-id"
      },
      {
        image_name: "image2.jpg",
        image_url: "http://localhost:3333/company/image2.jpg",
        company_id: "company-id"
      },
      {
        image_name: "image3.jpg",
        image_url: "http://localhost:3333/company/image3.jpg",
        company_id: "company-id"
      }
    ];

    await Promise.all(
      images.map(image => fakeImagesCompanyRepository.create(image))
    );

    const imagesCompany = await fakeImagesCompanyRepository.findImagesByCompany("company-id");

    const imagesUpdated = ["image1updated.jpg", "image2updated.jpg", "image3updated.jpg"];


    await expect(
      updateImageCompanyService.execute({
        company_id: "company-not-found",
        images: imagesUpdated
      })).rejects.toBeInstanceOf(AppError);
  });
});