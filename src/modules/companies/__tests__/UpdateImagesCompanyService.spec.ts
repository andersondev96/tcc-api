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

    const imagesCompany = await fakeImagesCompanyRepository.findImagesByCompany(company.id);

    const imagesUpdated = [
      {
        id: imagesCompany[0].id,
        image_name: "image1updated.jpg",
        image_url: "http://localhost:3333/company/image1updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[1].id,
        image_name: "image2updated.jpg",
        image_url: "http://localhost:3333/company/image2updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[2].id,
        image_name: "image3updated.jpg",
        image_url: "http://localhost:3333/company/image3updated.jpg",
        company_id: company.id
      }
    ];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    expect(updateImages).toEqual(imagesUpdated);
    expect(updateImages.length).toEqual(3);

    const updateImage = updateImages.find((image) => image.image_name === "image1updated.jpg");
    expect(updateImage.image_url).toEqual("http://localhost:3333/company/image1updated.jpg");
  });

  it("Should be able to update an image if have an existing image", async () => {

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

    await fakeImagesCompanyRepository.create({
      image_name: "image4.jpg",
      image_url: "http://localhost:3333/company/image4.jpg",
      company_id: company.id
    });

    await Promise.all(
      images.map(image => fakeImagesCompanyRepository.create(image))
    );

    const imagesCompany = await fakeImagesCompanyRepository.findImagesByCompany(company.id);

    const imagesUpdated = [
      {
        id: imagesCompany[0].id,
        image_name: "image1updated.jpg",
        image_url: "http://localhost:3333/company/image1updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[1].id,
        image_name: "image2updated.jpg",
        image_url: "http://localhost:3333/company/image2updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[2].id,
        image_name: "image3updated.jpg",
        image_url: "http://localhost:3333/company/image3updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[3].id,
        image_name: "image4updated.jpg",
        image_url: "http://localhost:3333/company/image4updated.jpg",
        company_id: company.id
      }
    ];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    expect(updateImages).toEqual(imagesUpdated);
    expect(updateImages.length).toEqual(4);
  });

  it("Should be able to update an image when add a new image", async () => {

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

    const imagesCompany = await fakeImagesCompanyRepository.findImagesByCompany(company.id);

    const imagesUpdated = [
      {
        id: imagesCompany[0].id,
        image_name: "image1updated.jpg",
        image_url: "http://localhost:3333/company/image1updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[1].id,
        image_name: "image2updated.jpg",
        image_url: "http://localhost:3333/company/image2updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[2].id,
        image_name: "image3updated.jpg",
        image_url: "http://localhost:3333/company/image3updated.jpg",
        company_id: company.id
      },
      {
        image_name: "new_image.jpg",
        image_url: "http://localhost:3333/company/new_image.jpg",
        company_id: company.id
      }
    ];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    const newImage = updateImages.find((image) => image.image_name === "new_image.jpg");
    expect(newImage.image_url).toEqual("http://localhost:3333/company/new_image.jpg");
  });

  it("Should be able to delete an image", async () => {

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
        image_url: "http://localhost:3333/company/image4.jpg",
        company_id: company.id
      }
    ];

    await Promise.all(
      images.map(image => fakeImagesCompanyRepository.create(image))
    );

    const imagesCompany = await fakeImagesCompanyRepository.findImagesByCompany(company.id);

    const imagesUpdated = [
      {
        id: imagesCompany[0].id,
        image_name: "image1updated.jpg",
        image_url: "http://localhost:3333/company/image1updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[1].id,
        image_name: "image2updated.jpg",
        image_url: "http://localhost:3333/company/image2updated.jpg",
        company_id: company.id
      },
      {
        id: imagesCompany[2].id,
        image_name: "image3updated.jpg",
        image_url: "http://localhost:3333/company/image3updated.jpg",
        company_id: company.id
      }
    ];

    const updateImages = await updateImageCompanyService.execute({
      company_id: company.id,
      images: imagesUpdated
    });

    expect(updateImages).toEqual(imagesUpdated);
    expect(updateImages.length).toBe(3);
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

    const imagesUpdated = [
      {
        id: imagesCompany[0].id,
        image_name: "image1updated.jpg",
        image_url: "http://localhost:3333/company/image1updated.jpg",
        company_id: "company-id"
      },
      {
        id: imagesCompany[1].id,
        image_name: "image2updated.jpg",
        image_url: "http://localhost:3333/company/image2updated.jpg",
        company_id: "company-id"
      },
      {
        id: imagesCompany[2].id,
        image_name: "image3updated.jpg",
        image_url: "http://localhost:3333/company/image3updated.jpg",
        company_id: "company-id"
      },
      {
        image_name: "new_image.jpg",
        image_url: "http://localhost:3333/company/new_image.jpg",
        company_id: "company-id"
      }
    ];

    await expect(
      updateImageCompanyService.execute({
        company_id: "company-not-found",
        images: imagesUpdated
      })).rejects.toBeInstanceOf(AppError);
  });
});