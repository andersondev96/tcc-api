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

    const convertImages = images.map((imageString, index) => ({
      id: listImages[index].id,
      image_name: imageString,
      image_url: `http://localhost:3333/company/${imageString}`,
      company_id: company.id,
    }));

    listImages.forEach(async (image) => {
      await this.storageProvider.delete(image.image_name, "company");
    });

    const updatedImages = await Promise.all(convertImages.map(async (image) => {

      const updateImage = await this.imageCompanyRepository.update({
        id: image.id,
        image_name: image.image_name,
        image_url: image.image_url,
        company_id: company.id,
      });

      await this.storageProvider.save(image.image_name, "company");

      return updateImage;
    }));

    return updatedImages;

  }
}