
import { IChatRoomsRepository } from "websocket/repositories/IChatRoomsRepository";

import { prisma } from "@database/prisma";

import { ChatRoom } from "../entities/ChatRoom";

export class ChatRoomsRepository implements IChatRoomsRepository {
  public async create({ id, connections }: { id: string, connections: string[] }): Promise<ChatRoom> {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        id,
        connections: {
          connect: connections.map((user) => ({ id: user }))
        }
      }
    });

    return chatRoom;
  }

  public async findById(chatroom_id: string): Promise<ChatRoom> {
    const chatRoom = await prisma.chatRoom.findUnique({
      where: {
        id: chatroom_id
      }
    });

    return chatRoom;
  }

  public async findByConnection(connections: string[]): Promise<ChatRoom> {
    const chatRoom = await prisma.chatRoom.findFirst({
      where: {
        connections: {
          every: {
            socket_id: {
              in: connections
            }
          }
        }
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