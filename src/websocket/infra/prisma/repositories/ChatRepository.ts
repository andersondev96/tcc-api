
import { ICreateChatDTO } from "websocket/dtos/ICreateChatDTO";
import { IChatRepository } from "websocket/repositories/IChatRepository";

import { prisma } from "@database/prisma";

import { Chat } from "../entities/Chat";

export class ChatRepository implements IChatRepository {
  public async create({
    id,
    name,
    text,
    company_id,
    user_id,
    chatroom_id
  }: ICreateChatDTO): Promise<Chat> {
    const chat = await prisma.chat.create({
      data: {
        id,
        name,
        text,
        company_id,
        user_id,
        chatroom_id
      }
    });

    return chat;
  }

  public async listAllMessages(chatroom_id: string): Promise<Chat[]> {
    const messages = await prisma.chat.findMany({
      where: {
        chatroom_id
      }
    });

    return messages;
  }


}