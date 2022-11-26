import { ICreateContactDTO } from "../dtos/ICreateContactDTO";
import { Contact } from "../infra/prisma/entities/Contact";

export interface IContactsRepository {

  /**
   * @description Cadastra um novo contato
   * @param data ICreateContactDTO interface que fornece os atributos necessários para o cadastro
   */
  create(data: ICreateContactDTO): Promise<Contact>;

  /**
   * @description Busca um contato cadastrado pelo id
   * @param id string ID do contato
   */
  findById(id: string): Promise<Contact>;

  /**
   * @description Atualiza os dados do contato cadatrado
   * @param data ICreateContactDTO cada campo do contato
   */
  update(data: ICreateContactDTO): Promise<Contact>;

  /**
   * @description Remove o contato do banco de dados
   * @param id string ID do contato
   */
  delete(id: string): Promise<void>;
}