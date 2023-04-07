import { ICreateChatDTO } from "websocket/dtos/ICreateChatDTO";

import { Chat } from "../infra/prisma/entities/Chat";


export interface IChatsRepository {
  create(data: ICreateChatDTO): Promise<Chat>;

  findMessages(roomId: string): Promise<Chat[]>;

  listAllMessages(chatroom_id: string): Promise<Chat[]>;
}