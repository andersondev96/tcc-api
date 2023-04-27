import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";

interface IImages {
  id?: string;
  title?: string;
  image_name: string;
  image_url?: string;
  company_id?: string;

}
interface IRequest {
  company_id: string;
  images: string[];
}

@injectable()
export class UpdateImagesCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("ImagesCompanyRepository")
    private imageCompanyRepository: IImagesCompanyRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ company_id, images }: IRequest): Promise<IImages[]> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const listImages = await this.imageCompanyRepository.findImagesByCompany(company.id);

    // Remove imagens

    const indexesToRemove = listImages.slice(images.length).map((image) => image.id);

    await Promise.all(indexesToRemove.map(async (id) => {
      const imageToRemove = await this.imageCompanyRepository.findImageById(id);
      await this.imageCompanyRepository.delete(imageToRemove.id);
      await this.storageProvider.delete(imageToRemove.image_name, "company");
    }));


    const convertImages = images.map((imageString, index) => {
      const existingIndex = listImages.findIndex((_, i) => i === index);
      if (existingIndex === -1) {
        return {
          id: null,
          image_name: imageString,
          image_url: `http://localhost:3333/company/${imageString}`,
          company_id: company.id
        };
      }
      const existingImage = listImages[existingIndex];
      return {
        id: existingImage.id,
        image_name: imageString,
        image_url: `http://localhost:3333/company/${imageString}`,
        company_id: company.id
      };
    });

    listImages.forEach(async (image) => {
      await this.storageProvider.delete(image.image_name, "company");
    });

    // Atualiza imagens existentes e cria novas imagens

    const updatedImages = await Promise.all(convertImages.map(async (image) => {

      if (image.id) {
        const updateImage = await this.imageCompanyRepository.update({
          id: image.id,
          image_name: image.image_name,
          image_url: image.image_url,
          company_id: company.id,
        });

        await this.storageProvider.save(image.image_name, "company");

        return updateImage;
      } else {
        const newImage = await this.imageCompanyRepository.create({
          image_name: image.image_name,
          image_url: image.image_url,
          company_id: company.id
        });

        await this.storageProvider.save(image.image_name, "company");

        return newImage;
      }
    }));

    return updatedImages;
  }
}
