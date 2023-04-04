
import { IChatRoomsRepository } from "websocket/repositories/IChatRoomsRepository";

import { prisma } from "@database/prisma";

import { ChatRoom } from "../entities/ChatRoom";


export class ChatRoomsRepository implements IChatRoomsRepository {
  public async create({ id, users }: { id: string, users: string[] }): Promise<ChatRoom> {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        id,
        users: {
          connect: users.map((user) => ({ id: user }))
        }
      },
      include: {
        users: true
      }
    });

    return chatRoom;
  }

  public async findById(chatroom_id: string): Promise<ChatRoom> {
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: chatroom_id
      },
      include: {
        users: true
      }
    });

    return chatRoom;
  }

  public async delete(chatroom_id: string): Promise<void> {
    await prisma.chatRoom.delete({
      where: {
        id: chatroom_id
      }
    });
  }

}