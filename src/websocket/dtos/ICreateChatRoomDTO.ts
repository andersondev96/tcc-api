import { Chat } from "websocket/infra/prisma/entities/Chat";

export interface ICreateChatRoomDTO {
  id?: string;
  connections_id?: string[];
  connections: string[];
  chats?: Chat[];
}
