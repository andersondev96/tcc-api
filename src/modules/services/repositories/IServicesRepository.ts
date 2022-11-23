import { ICreateServiceDTO } from "../dtos/ICreateServiceDTO";
import { Service } from "../infra/prisma/entities/Service";

export interface IServicesRepository {

    /**
     * @description Cria um novo serviço
     * @param data ICreateServiceDTO Atributos necessários para o cadastro de um novo serviço
     * @return Service Retorna a entidade service
     */
    create(data: ICreateServiceDTO): Promise<Service>;

    /**
     * @description Lista os serviços que pertencem a empresa
     * @param company_id string - ID da company
     * @return Service[] - Retorna o array dos services encontrados
     */
    listServicesByCompany(company_id: string): Promise<Service[]>;

    /**
     * @description Lista os serviços que fazem parte da categoria pesquisada
     * @param company_id: id da company
     * @param category string - category pesquisada
     * @return Service[] - Retorna o array dos serviços encontrados
     */
    listServicesByCategory(company_id: string, category: string): Promise<Service[]>;

    /**
     * @description Lista os serviços que possuem o nome pesquisado ou parte dele  
     * @param name string - nome pesquisado
     * @param company_id string - id da company
     * @return Service[] - Retorna o array dos serviços encontrados
     */
    findServicesByName(company_id: string, name: string): Promise<Service[]>;

    /**
     * @description Busca e lista o serviço pelo seu id
     * @param id - ID do serviço
     * @return Service - Retorna o service encontrado
     */
    findServiceById(id: string): Promise<Service>;

    /**
     * @description Atualiza o serviço
     * @param data ICreateServiceDTO - Atributo que recebe os valores dos campos para serem atualizados
     * @return Service - Retorna o service atualizado
     */
    update(data: ICreateServiceDTO): Promise<Service>;

    /**
     * @description Apaga o serviço do banco de dados
     * @param id string - ID do serviço
     */
    delete(id: string): Promise<void>;
}