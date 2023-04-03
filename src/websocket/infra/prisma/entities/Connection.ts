
export class Connection {
  id: string;
  user_id: string;
  socket_id: string;

  constructor({ id, user_id, socket_id }: Connection) {
    return Object.assign(this, {
      id,
      user_id,
      socket_id
    });
  }
}