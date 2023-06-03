import { User } from "@modules/users/infra/prisma/entities/User";

export class Customer {
  id?: string;
  user_id: string;
  telephone?: string;
  status?: string;
  user?: User;

  constructor({ user_id, user }: Customer) {
    return Object.assign(this, {
      user_id,
      user
    });
  }
}