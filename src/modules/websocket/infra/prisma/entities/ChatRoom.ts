import { Chat } from "./Chat";
import { Connection } from "./Connection";


export class ChatRoom {
  id: string;
  connections_id?: string[];
  connections?: Connection[];
  chats?: Chat[];

  constructor({ id, connections_id }: ChatRoom) {
    Object.assign(this, { id, connections_id });
  }
}