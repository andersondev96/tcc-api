import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { IChatRoomsRepository } from "websocket/repositories/IChatRoomsRepository";


@injectable()
export class DeleteChatRoomService {

  constructor(
    @inject("ChatRoomsRepository")
    private chatRoomRepository: IChatRoomsRepository
  ) { }

  public async execute(chatroom_id: string) {

    const chatRoom = await this.chatRoomRepository.findById(chatroom_id);

    if (!chatRoom) {
      throw new AppError("Chatroom not found");
    }

    await this.chatRoomRepository.delete(chatroom_id);
  }
}