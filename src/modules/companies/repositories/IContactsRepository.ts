import { ICreateContactDTO } from "../dtos/ICreateContactDTO";
import { Contact } from "../infra/prisma/entities/Contact";

export interface IContactsRepository {

  create(data: ICreateContactDTO): Promise<Contact>;

  findById(id: string): Promise<Contact>;

  update(data: ICreateContactDTO): Promise<Contact>;

  delete(id: string): Promise<void>;
}