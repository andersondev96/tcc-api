import { inject, injectable } from "tsyringe";
import { ChatRoom } from "websocket/infra/prisma/entities/ChatRoom";
import { IChatRoomsRepository } from "websocket/repositories/IChatRoomsRepository";

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