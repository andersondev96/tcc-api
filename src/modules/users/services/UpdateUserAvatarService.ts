import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";

import { IUsersRepository } from "../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
  avatar_url: string;
}

@injectable()
export class UpdateUserAvatarService {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  public async execute({ user_id, avatar_url }: IRequest): Promise<void> {

    const user = await this.usersRepository.findById(user_id);

    if (user.avatar) {
      await this.storageProvider.delete(user.avatar, "avatar");
    }

    await this.storageProvider.save(avatar_url, "avatar");

    user.avatar = avatar_url;

    await this.usersRepository.update(user);
  }
}