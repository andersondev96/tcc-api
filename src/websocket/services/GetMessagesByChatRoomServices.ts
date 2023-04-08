import { inject, injectable } from "tsyringe";
import { Chat } from "websocket/infra/prisma/entities/Chat";
import { IChatsRepository } from "websocket/repositories/IChatsRepository";

@injectable()
export class GetMessagesByChatRoomService {

  constructor(
    @inject("ChatsRepository")
    private chatRepository: IChatsRepository
  ) { }

  public async execute(roomId: string): Promise<Chat[]> {
    console.log(roomId);
    const messages = await this.chatRepository.findMessages(
      roomId
    );

    return messages;
  }
}