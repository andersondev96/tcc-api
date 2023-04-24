import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { ImageCompany } from "../infra/prisma/entities/ImageCompany";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";

interface IImages {
  id?: string;
  title?: string;
  image_name: string;
  image_url: string;
  company_id: string;

}
interface IRequest {
  company_id: string;
  images: IImages[];
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

  public async execute({ company_id, images }: IRequest): Promise<ImageCompany[]> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const listImages = await this.imageCompanyRepository.findImagesByCompany(company.id);

    const newImages: IImages[] = [];
    const imagesWithoutId: IImages[] = [];

    for (const image of images) {
      if (!image.id) {
        imagesWithoutId.push(image);
        continue;
      }

      const oldImagesIndex = listImages.findIndex(img => img.id === image.id);

      if (oldImagesIndex === -1) {
        newImages.push(image);
      } else {
        const oldImage = listImages[oldImagesIndex];

        if (oldImage.image_name !== image.image_name) {
          newImages.push(image);
        }

        listImages.splice(oldImagesIndex, 1);
      }
    }

    // Deleta as imagens que não existem mais
    for (const image of listImages) {
      await this.storageProvider.delete(image.image_name, "companies");
      await this.imageCompanyRepository.delete(image.id);
    }

    // Insere ou atualiza imagens
    const updatedImages: IImages[] = [];

    if (imagesWithoutId.length > 0) {
      for (const image of imagesWithoutId) {
        await this.storageProvider.save(image.image_name, "companies");
        const addNewImages = await this.imageCompanyRepository.create({
          image_name: image.image_name,
          image_url: `http://localhost:3333/compoany/${image.id}`,
          company_id
        });

        updatedImages.push(addNewImages);
      }
    }

    for (const image of newImages) {
      const updatedImage = await this.imageCompanyRepository.update({
        id: image.id,
        image_name: image.image_name,
        image_url: `http://localhost:3333/compoany/${image.id}`,
        company_id
      });

      updatedImages.push(updatedImage);
    }

    return updatedImages;

  }
}