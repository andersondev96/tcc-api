import { ChatRoom } from "@modules/websocket/infra/prisma/entities/ChatRoom";
import { IChatRoomsRepository } from "@modules/websocket/repositories/IChatRoomsRepository";
import { inject, injectable } from "tsyringe";

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