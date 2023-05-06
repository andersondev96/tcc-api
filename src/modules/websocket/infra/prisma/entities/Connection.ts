import { User } from "@prisma/client";

export class Connection {
  id?: string;
  user_id: string;
  socket_id: string;
  user?: User;

  constructor({ user_id, socket_id, user }: Connection) {
    return Object.assign(this, {
      user_id,
      socket_id,
      user
    });
  }
}