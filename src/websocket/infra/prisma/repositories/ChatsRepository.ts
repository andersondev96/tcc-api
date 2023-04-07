
import { ICreateChatDTO } from "websocket/dtos/ICreateChatDTO";
import { IChatsRepository } from "websocket/repositories/IChatsRepository";

import { prisma } from "@database/prisma";

import { Chat } from "../entities/Chat";

export class ChatsRepository implements IChatsRepository {
  public async create({
    id,
    name,
    text,
    chatroom_id,
    connection_id
  }: ICreateChatDTO): Promise<Chat> {
    const chat = await prisma.chat.create({
      data: {
        id,
        name,
        text,
        chatroom_id,
        connection_id
      },
      include: {
        chatroom: true,
        connection: true
      }
    });

    return chat;
  }

  public async listAllMessages(chatroom_id: string): Promise<Chat[]> {
    const messages = await prisma.chat.findMany({
      where: {
        chatroom_id
      },
      include: {
        chatroom: true,
        connection: true
      }
    });

    return messages;
  }


}