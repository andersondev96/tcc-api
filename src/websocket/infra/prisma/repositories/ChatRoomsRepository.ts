
import { ICreateChatRoomDTO } from "websocket/dtos/ICreateChatRoomDTO";
import { IChatRoomsRepository } from "websocket/repositories/IChatRoomsRepository";

import { prisma } from "@database/prisma";

import { ChatRoom } from "../entities/ChatRoom";


export class ChatRoomsRepository implements IChatRoomsRepository {
  public async create({
    id,
    idUsers
  }: ICreateChatRoomDTO): Promise<ChatRoom> {
    const chatRoom = await prisma.chatRoom.create({
      data: {
        id,
        idUsers
      }
    });

    return chatRoom;
  }

  public async findById(chatroom_id: string): Promise<ChatRoom> {
    throw new Error("Method not implemented.");
  }

  public async delete(chatroom_id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }


}