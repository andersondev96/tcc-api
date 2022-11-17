import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { inject, injectable } from "tsyringe";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";

@injectable()
export class UpdateImagesCompanyService {

    constructor(
        @inject("ImagesCompanyRepository")
        private imageCompanyRepository: IImagesCompanyRepository,

        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) { }

    public async execute(id: string, image_name: string): Promise<void> {

        const image = await this.imageCompanyRepository.findImageById(id);

        if (image.image_name) {
            await this.storageProvider.delete(image.image_name, "companies");
        }

        await this.storageProvider.save(image_name, "companies");

        const result = await this.imageCompanyRepository.update({
            id: image.id,
            company_id: image.company_id,
            image_name,
            image_url: `http://localhost:3333/companies/${image_name}`
        });
    }
}