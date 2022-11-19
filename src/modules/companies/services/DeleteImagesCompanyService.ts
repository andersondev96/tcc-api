import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";

@injectable()
export class DeleteImagesCompanyService {

    constructor(
        @inject("ImagesCompanyRepository")
        private imagesCompanyRepository: IImagesCompanyRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    public async execute(image_id: string): Promise<void> {

        const image = await this.imagesCompanyRepository.findImageById(image_id);

        if (!image) {
            throw new AppError("Image not found");
        }

        await this.storageProvider.delete(image.image_name, "companies");

        await this.imagesCompanyRepository.delete(image_id);
    }
}