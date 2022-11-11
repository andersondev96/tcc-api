import { ICreateServicesOfferedOnCompanyDTO } from "../dtos/ICreateServicesOfferedOnCompanyDTO";
import { ServiceOfferedOnCompany } from "../infra/prisma/entities/ServiceOfferedOnCompany";

export interface IServicesOfferedOnCompanyRepository {

    /**
     * @description Vincula uma empresa a um tipo de serviço que é oferecido
     * @param data ICreateServicesOfferedOnCompanyDTO recebe os parâmetros que são necessários para cadastrar na tabela
     */
    linkCompanyToServiceOffered(data: ICreateServicesOfferedOnCompanyDTO): Promise<ServiceOfferedOnCompany>;

    /**
     * @description Busca e lista os dados que contenham o company_id passado
     * @param company_id string id da empresa vinculada
     */
    findServicesByCompany(company_id: string): Promise<ServiceOfferedOnCompany[] | undefined>;

    /**
     * @description Busca e lista os dados que contenham o id do serviço oferecido
     * @param service_offered_id  string id do serviço oferecido
     */
    findCompanyByServiceOffered(service_offered_id: string): Promise<ServiceOfferedOnCompany[] | undefined>;

    /**
     * @description Conta quantas vezes a empresa aparece na tabela
     * @param company_id 
     */
    contCompany(company_id: string): Promise<number>;

    /**
     * @description Atualiza o víncula de uma empresa com um serviço oferecido
     * @param data ICreateServicesOfferedOnCompanyDTO recebe os dados que serão atualizados
     */
    update(data: ICreateServicesOfferedOnCompanyDTO): Promise<ServiceOfferedOnCompany>;

    /**
     * @description Desvincula a empresa com o serviço oferecido passado
     * @param company_id 
     */
    unlinkCompany(company_id: string, service_offered_id: string): Promise<void>;
}