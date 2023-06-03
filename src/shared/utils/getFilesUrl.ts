import { Company } from "@modules/companies/infra/prisma/entities/Company";
import { EntrepreneurSettings } from "@modules/entrepreneurs/infra/prisma/entities/EntrepreneurSettings";
import { Budget } from "@modules/proposals/infra/prisma/entities/Budget";
import { Service } from "@modules/services/infra/prisma/entities/Service";
import { User } from "@modules/users/infra/prisma/entities/User";

export function getUserAvatarUrl(objectWithImage: User, segment: string): string {

  if (!objectWithImage.avatar) {
    return undefined;
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return `${baseUrl}/${segment}/${objectWithImage.avatar}`;
}

export function getCompanyImages(objectCompanyImages: Company, segment: string): string[] {

  if (!objectCompanyImages.ImageCompany) {
    return [];
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return objectCompanyImages.ImageCompany.map((file) => {
    return file.image_name ?
      `${baseUrl}/${segment}/${file.image_name}` : undefined;
  }).filter(Boolean);

}

export function getServiceImageUrl(objectWithImage: Service, segment: string): string {

  if (!objectWithImage.image_url) {
    return undefined;
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return `${baseUrl}/${segment}/${objectWithImage.image_url}`;
}

export function getBudgetFiles(objectWithFile: Budget, segment: string): string[] {

  if (!objectWithFile.files) {
    return [];
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return objectWithFile.files.map((file) => {
    return file.length > 0 ?
      `${baseUrl}/${segment}/${file}` : undefined;
  }).filter(Boolean);

}

export function getCompanyLogo(objectLogoCompany: EntrepreneurSettings, segment: string): string {

  if (!objectLogoCompany.company_logo) {
    return undefined;
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return `${baseUrl}/${segment}/${objectLogoCompany.company_logo}`;

}
