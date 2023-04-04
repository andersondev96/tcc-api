import { User } from "@modules/users/infra/prisma/entities/User";

export class ChatRoom {
  id: string;
  users: User[];

  constructor({ id, users }: ChatRoom) {
    Object.assign(this, { id, users });
  }
}