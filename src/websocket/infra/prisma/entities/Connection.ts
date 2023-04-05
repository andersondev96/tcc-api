
export class Connection {
  id?: string;
  user_id: string;
  socket_id: string;

  constructor({ user_id, socket_id }: Connection) {
    return Object.assign(this, {
      user_id,
      socket_id
    });
  }
}