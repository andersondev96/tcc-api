import { ICreateServiceOfferedDTO } from "../dtos/ICreateServiceOfferedDTO";
import { ServiceOffered } from "../infra/prisma/entities/ServiceOffered";


export interface IServicesOfferedRepository {

    /**
     * @description Função que cadastra um novo tipo de serviço oferecido no banco de dados
     * @param data ICreateServiceOffered Recebe os dados que serão passados para tabela
     */
    create(data: ICreateServiceOfferedDTO): Promise<ServiceOffered>;

    /**
     * @description Busca o serviço oferecido pelo id
     * @param id string id do serviço oferecido
     */
    findById(id: string): Promise<ServiceOffered>;

    /**
     * @description Busca o tipo serviço oferecido pelo nome de sua descrição
     * @param description string Nome do serviço
     */
    findByDescription(description: string): Promise<ServiceOffered>;

}