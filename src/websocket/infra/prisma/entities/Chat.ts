import { ChatRoom } from "./ChatRoom";
import { Connection } from "./Connection";

export class Chat {
  id: string;
  name?: string;
  text: string;
  chatroom_id: string;
  connection_id: string;
  chatroom?: ChatRoom;
  connection?: Connection;

  constructor({ id, name, text, chatroom_id, connection_id, chatroom, connection }: Chat) {
    return Object.assign(this, {
      id,
      name,
      text,
      chatroom_id,
      connection_id,
      chatroom,
      connection
    });
  }
}