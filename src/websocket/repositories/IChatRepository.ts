import { ICreateChatDTO } from "websocket/dtos/ICreateChatDTO";

import { Chat } from "../infra/prisma/entities/Chat";


export interface IChatRepository {
  create(data: ICreateChatDTO): Promise<Chat>;

  listAllMessages(chatroom_id: string): Promise<Chat[]>;
}