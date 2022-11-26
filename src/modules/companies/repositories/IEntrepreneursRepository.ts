import { ICreateEntrepreneurDTO } from "../dtos/ICreateEntrepreneurDTO";
import { Entrepreneur } from "../infra/prisma/entities/Entrepreneur";

export interface IEntrepreneursRepository {

    /**
     * @description Vincula um usuário com uma empresa para ele se tornar um empreendedor
     * @param data IEntrepreneursRepository - Recebe como parâmetro atributos de Entrepreneur
     * @return Entrepreneur - Retorna o model Entrepreneur
     */
    create(data: ICreateEntrepreneurDTO): Promise<Entrepreneur>;

    /**
     * @description Busca um empreendedor pelo seu id
     * @param id string - id do empreendedor
     * @return Entrepreneur - Retorna o model do empreendedor
     */
    findById(id: string): Promise<Entrepreneur>;

    /**
     * @description Busca um empreendedor pelo seu usuário
     * @param user_id  - id do usuário
     * @return Entrepreneur - Retorna o model do empreendedor
     */
    findByUser(user_id: string): Promise<Entrepreneur>;

    /**
     * @description Atualiza um empreendedor
     * @param data id string - id do empreendedor
     * @return Entrepreneur - Retorna o model do empreendedor
     */
    update(data: ICreateEntrepreneurDTO): Promise<Entrepreneur>;

    /**
     * @description Exclui o empreendedor
     * @param id string - id do empreendedor
     */
    delete(id: string): Promise<void>;
}