import { ChatRoom } from "@modules/websocket/infra/prisma/entities/ChatRoom";
import { IChatRoomsRepository } from "@modules/websocket/repositories/IChatRoomsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateChatRoomService {

  constructor(
    @inject("ChatRoomsRepository")
    private chatRoomRepository: IChatRoomsRepository
  ) { }
  async execute(connections: string[]): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.create({
      connections
    });

    return room;
  }
}