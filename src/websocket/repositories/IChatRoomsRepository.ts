import { ICreateChatRoomDTO } from "websocket/dtos/ICreateChatRoomDTO";

import { ChatRoom } from "../infra/prisma/entities/ChatRoom";


export interface IChatRoomsRepository {
  create(data: ICreateChatRoomDTO): Promise<ChatRoom>;

  findById(chatroom_id: string): Promise<ChatRoom>;

  findByConnection(connections: string[]): Promise<ChatRoom>;

  delete(chatroom_id: string): Promise<void>;
}