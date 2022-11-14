import { prisma } from "@database/prisma";
import { ICreateImageCompanyDTO } from "@modules/companies/dtos/ICreateImageCompanyDTO";
import { IImagesCompanyRepository } from "@modules/companies/repositories/IImagesCompanyRepository";
import { ImageCompany } from "../entities/ImageCompany";

export class ImagesCompanyRepository implements IImagesCompanyRepository {

    public async create({
        id,
        title,
        image_name,
        image_url,
        company_id
    }: ICreateImageCompanyDTO): Promise<ImageCompany> {
        const image = await prisma.imageCompany.create({
            data: {
                id,
                title,
                image_name,
                image_url,
                company_id
            }
        });

        return image;
    }

    public async findImageById(id: string): Promise<ImageCompany> {
        const image = await prisma.imageCompany.findUnique({
            where: { id },
        });

        return image;
    }

    public async findImagesByCompany(company_id: string): Promise<ImageCompany[]> {
        const images = await prisma.imageCompany.findMany({
            where: { company_id },
        });

        return images;
    }

    public async update(data: ICreateImageCompanyDTO): Promise<ImageCompany> {
        const image = await prisma.imageCompany.update({
            where: { id: data.id },
            data: { ...data },
        });

        return image;
    }

    public async delete(id: string): Promise<void> {
        await prisma.imageCompany.delete({
            where: { id },
        });
    }

}