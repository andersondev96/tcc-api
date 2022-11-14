import { ICreateImageCompanyDTO } from "../dtos/ICreateImageCompanyDTO";
import { ImageCompany } from "../infra/prisma/entities/ImageCompany";

export interface IImagesCompanyRepository {

    /**
     * @description Função responsável por salvar uma imagem no banco de dados
     * @param data ICreateImageCompanyDTO - Recebe os atributos para cada campo
     * @return ImageCompany - Retorna o resultado na entidade ImageCompany
     */
    create(data: ICreateImageCompanyDTO): Promise<ImageCompany>;

    /**
     * @description Função que busca a imagem cadastrada segundo o id passado
     * @param id string - id da imagem 
     * @return ImageCompany - Retorna o resultado na entidade ImageCompany
     */
    findImageById(id: string): Promise<ImageCompany>;

    /**
     * @description Função que busca todas as imagens da empresa 
     * @param company_id string - id da empresa que deseja encontrar as imagens
     * @return ImageCompany[] - Retorna uma array da entidade ImageCompany
     */
    findImagesByCompany(company_id: string): Promise<ImageCompany[]>;

    /**
     * @description Função que edita uma imagem cadastrada
     * @param data ICreateImageCompanyDTO - Recebe os atributos para cada campo atualizado
     * @return ImageCompany - Retorna o resultado na entidade ImageCompany
     */
    update(data: ICreateImageCompanyDTO): Promise<ImageCompany>;

    /**
     * @description Função que exclui uma imagem cadastrada
     * @param id string - id da imagem que será excluída
     */
    delete(id: string): Promise<void>;
}