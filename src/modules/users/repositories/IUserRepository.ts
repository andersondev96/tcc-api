import ICreateUserDTO from "../dtos/ICreateUserDTO";

export interface IUserRepository {
  create({ name, email, password }: ICreateUserDTO): Promise<void>;
}
