import { User } from "@modules/users/infra/prisma/entities/User";

type ImageObject = {
  image_url?: string;
  avatar: string;
};

export function getUserAvatarUrl(objectWithImage: User, segment: string): string {

  if (!objectWithImage.avatar) {
    return undefined;
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return `${baseUrl}/${segment}/${objectWithImage.avatar}`;
}

export function getServiceImageUrl(objectWithImage: User, segment: string): string {

  if (!objectWithImage.avatar) {
    return undefined;
  }

  const baseUrl = process.env.disk === "local"
    ? process.env.APP_API_URL
    : process.env.AWS_BUCKET_URL;

  return `${baseUrl}/${segment}/${objectWithImage.avatar}`;
}
