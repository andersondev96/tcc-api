
export class Chat {
  id: string;
  name?: string;
  text: string;
  chatroom_id: string;
  connection_id: string;

  constructor({ id, name, text, chatroom_id, connection_id }: Chat) {
    return Object.assign(this, {
      id,
      name,
      text,
      chatroom_id,
      connection_id
    });
  }
}