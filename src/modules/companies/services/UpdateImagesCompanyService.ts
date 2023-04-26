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

  public async execute({ company_id, images }: IRequest): Promise<ImageCompany[]> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const currentImages = await this.imageCompanyRepository.findImagesByCompany(company.id);

    // Atualiza ou exclui as imagens existentes
    for (const currentImage of currentImages) {
      const index = images.findIndex((imageId) => imageId === currentImage.id);

      if (index === -1) {
        // Imagem não fornecida pelo usuário
        await this.storageProvider.delete(currentImage.image_name, "companies");
        await this.imageCompanyRepository.delete(currentImage.id);
      } else {
        // Imagem fornecida pelo usuário
        const newImageUrl = images[index];
        await this.storageProvider.delete(currentImage.image_name, "companies");
        await this.storageProvider.save(newImageUrl, "companies")
        await this.imageCompanyRepository.update({
          id: currentImage.id,
          company_id,
          image_name: images[index],
          image_url: `http://localhost:3333/company/${images[index]}`,
        });

        //Remove a imagem da lista de imagens
        images.splice(index, 1);
      }
    }

    // Adiciona novas imagens
    for (const imageUrl of images) {
      await this.storageProvider.save(imageUrl, "companies");
      await this.imageCompanyRepository.create({
        company_id: company.id,
        image_name: imageUrl,
        image_url: `http://localhost:3333/company/${imageUrl}`,
      });
    }

    return this.imageCompanyRepository.findImagesByCompany(company.id);

  }
}