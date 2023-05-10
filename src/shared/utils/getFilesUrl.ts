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

export function getServiceImageUrl(objectWithImage: Service, segment: string): string {

  if (!objectWithImage.image_url) {
    return undefined;
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return `${baseUrl}/${segment}/${objectWithImage.image_url}`;
}
