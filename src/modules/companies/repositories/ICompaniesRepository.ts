import { StringMap } from "ts-jest";
import { ICreateCompanyDTO } from "../dtos/ICreateCompanyDTO";
import { Company } from "../infra/prisma/entities/Company";


export interface ICompaniesRepository {

    /**
     * @description Cria uma nova empresa
     * @param data ICreateCompanyDTO Atributos necessários para o cadastro de uma empresa
     */
    create(data: ICreateCompanyDTO): Promise<Company>;

    /**
     * @description lista todas as empresas cadastradas
     */
    listAll(): Promise<Company[]>;

    /**
     * @description lista as empresas que estão em determinado local, segundo as coordenadas
     * @param latitude number Latitude que está localizado o estabelecimento
     * @param longitude number Longitude que está localizado o estabelecimento
     */
    listByLocalization(latitude: number, longitude: number): Promise<Company[] | undefined>;

    /**
     * @description Lista as empresas segundo os atributos que são filtrados
     * @param category string Categoria a qual a empresa pertence
     * @param state string Estado onde a empresa está localizada
     * @param city string Cidade onde a empresa está localizada
     * @param price number Preço médio dos produtos/serviços ofertados pela empresa
     */
    listByFilter(category?: string, state?: string, city?: StringMap, price?: number): Promise<Company[] | undefined>;

    /**
     * @description Lista a empresa que tem um determinado nome
     * @param name string Nome da empresa
     */
    findByName(name: string): Promise<Company | undefined>;

    /**
     * @description Lista a empresa que tem determinado id
     * @param id string Id da empresa
     */
    findById(id: string): Promise<Company | undefined>;

    /**
     * @description Recebe os atributos da tabela company e a atualiza
     * @param company ICreateCompanyDTO Atributos de cada campo da tabela company
     */
    update(company: ICreateCompanyDTO): Promise<Company>;

    /**
     * @description Recebe o id de uma empresa e remove do banco de dados
     * @param id string Id da empresa
     */
    delete(id: string): Promise<void>;
}