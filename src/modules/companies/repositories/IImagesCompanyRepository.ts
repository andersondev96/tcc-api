import { ICreateImageCompanyDTO } from "../dtos/ICreateImageCompanyDTO";
import { ImageCompany } from "../infra/prisma/entities/ImageCompany";

export interface IImagesCompanyRepository {

  create(data: ICreateImageCompanyDTO): Promise<ImageCompany>;

  findImageById(id: string): Promise<ImageCompany>;

  findImagesByCompany(company_id: string): Promise<ImageCompany[]>;

  update(data: ICreateImageCompanyDTO): Promise<ImageCompany>;

  delete(id: string): Promise<void>;
}