import { Chat } from "@modules/websocket/infra/prisma/entities/Chat";
import { IChatsRepository } from "@modules/websocket/repositories/IChatsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
export class GetMessagesByChatRoomService {

  constructor(
    @inject("ChatsRepository")
    private chatRepository: IChatsRepository
  ) { }

  public async execute(roomId: string): Promise<Chat[]> {
    const messages = await this.chatRepository.findMessages(
      roomId
    );

    const userAvatarUrl = messages.map((message) => {
      return {
        ...message,
        connection: {
          ...message.connection,
          user: {
            ...message.connection.user,
            avatar: message.connection.user.avatar
              ? `${process.env.APP_API_URL}/avatar/${message.connection.user.avatar}`
              : undefined
          }
        }

      }
    })

    return userAvatarUrl;
  }
}