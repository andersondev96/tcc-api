import { User } from "@modules/users/infra/prisma/entities/User";

export class Assessment {
  id?: string;
  user_id: string;
  table_id: string;
  comment: string;
  stars?: number;
  createdAt?: Date;
  updatedAt?: Date;
  user?: User;

  constructor({ user_id, table_id, comment, user }: Assessment) {
    return Object.assign(this, {
      user_id,
      table_id,
      comment,
      user
    });
  }
}