

export class ChatRoom {
  id: string;

  constructor({ id }: ChatRoom) {
    Object.assign(this, { id });
  }
}