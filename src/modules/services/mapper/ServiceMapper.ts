import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../infra/prisma/entities/Service";

export class ServiceMapper {

  static toDTO({
    id,
    name,
    description,
    price,
    category,
    image_url,
    highlight_service,
    favorites,
    stars,
    assessments,
    company_id

  }: Service): ICreateServiceDTO {

    const service = {
      id,
      name,
      description,
      price,
      category,
      image_url: image_url ?
        `${process.env.disk === "local"
          ? process.env.APP_API_URL
          : process.env.AWS_BUCKET_URL}/service/${image_url}` : undefined,
      highlight_service,
      favorites,
      stars,
      assessments,
      company_id
    };

    return service;
  }
}