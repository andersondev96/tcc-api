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