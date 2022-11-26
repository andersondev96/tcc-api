import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";

interface IRequest {
  company_id: string;
  images_name: string[];
}

@injectable()
export class CreateImageCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("ImagesCompanyRepository")
    private imageCompanyRepository: IImagesCompanyRepository,


    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  public async execute({
    company_id,
    images_name,
  }: IRequest): Promise<void> {

    const companyExists = await this.companyRepository.findById(company_id);

    if (!companyExists) {
      throw new AppError("Company does not exist");
    }

    images_name.map(async (image) => {
      await this.imageCompanyRepository.create({
        image_name: image,
        image_url: `http://localhost:3333/companies/${image}`,
        company_id,
      });

      await this.storageProvider.save(image, "companies");
    })

  }
}