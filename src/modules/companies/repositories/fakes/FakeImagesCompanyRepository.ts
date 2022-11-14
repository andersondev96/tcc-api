import { v4 as uuid } from "uuid";

import { ICreateImageCompanyDTO } from "@modules/companies/dtos/ICreateImageCompanyDTO";
import { ImageCompany } from "@modules/companies/infra/prisma/entities/ImageCompany";
import { IImagesCompanyRepository } from "../IImagesCompanyRepository";

export class FakeImagesCompanyRepository implements IImagesCompanyRepository {

    imagesCompany: ImageCompany[] = [];

    public async create(data: ICreateImageCompanyDTO): Promise<ImageCompany> {
        Object.assign(data, {
            id: uuid(),
        });

        this.imagesCompany.push(data);

        return data;
    }

    public async findImageById(id: string): Promise<ImageCompany> {
        const image = this.imagesCompany.find((imageCompany) => imageCompany.id === id);

        return image;
    }

    public async findImagesByCompany(company_id: string): Promise<ImageCompany[]> {
        const images = this.imagesCompany.filter(
            (imageCompany) => imageCompany.company_id === company_id);

        return images;
    }

    public async update(data: ICreateImageCompanyDTO): Promise<ImageCompany> {
        const index = this.imagesCompany.findIndex(
            (imageCompany) => imageCompany.id === data.id);

        this.imagesCompany[index] = data;

        return data;
    }

    public async delete(id: string): Promise<void> {
        const index = this.imagesCompany.findIndex(
            (imageCompany) => imageCompany.id === id);

        this.imagesCompany.splice(index, 1);
    }

}