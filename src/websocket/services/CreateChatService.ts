import { inject, injectable } from "tsyringe";
import { Chat } from "websocket/infra/prisma/entities/Chat";
import { IChatsRepository } from "websocket/repositories/IChatsRepository";

interface IResponse {
  name?: string;
  text: string;
  chatroom_id: string;
  connection_id: string;
}

@injectable()
export class CreateChatService {

  constructor(
    @inject("ChatsRepository")
    private chatRepository: IChatsRepository
  ) { }

  public async execute({ name, text, chatroom_id, connection_id }: IResponse): Promise<Chat> {
    const chat = await this.chatRepository.create({
      name,
      text,
      chatroom_id,
      connection_id
    });

    return chat;
  }
}