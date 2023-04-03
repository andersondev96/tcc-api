import { User } from "@modules/users/infra/prisma/entities/User";

export class ChatRoom {
  id: string;
  idUsers: User[];

  constructor({ id, idUsers }: ChatRoom) {
    Object.assign(this, { id, idUsers });
  }
}