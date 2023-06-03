import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/prisma/entities/User";

export interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  findById(id: string): Promise<User | undefined>;
  findByMail(email: string): Promise<User | undefined>;
  addFavorite(user_id: string, favorite: string): Promise<User>;
  update(user: ICreateUserDTO): Promise<User>;
  delete(id: string): Promise<void>;

}
