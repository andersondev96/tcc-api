import { inject, injectable } from "tsyringe";
import { ChatRoom } from "websocket/infra/prisma/entities/ChatRoom";
import { IChatRoomsRepository } from "websocket/repositories/IChatRoomsRepository";

@injectable()
export class GetChatRoomByConnectionsService {

  constructor(
    @inject("ChatRoomsRepository")
    private chatRoomRepository: IChatRoomsRepository
  ) { }

  public async execute(connections: string[]): Promise<ChatRoom> {
    const room = await this.chatRoomRepository.findByConnection(connections);

    return room;
  }
}