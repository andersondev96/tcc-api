import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { Address } from "../infra/prisma/entities/Addreess";

export interface IAddressesRepository {

    /**
     * @description Função responsável em cadastrar um endereço
     * @param data ICreateAddressDTO - Recebe um DTO com os atributos do address
     * @return Address - Retorna uma promise da classe Address
     */
    create(data: ICreateAddressDTO): Promise<Address>;

    /**
     * @description Função responsável por buscar e retornar um endereço dado um id
     * @param id string - id do endereço que deseja buscar
     * @return Address - Retorna o endereço procurado
     */
    findByAddress(id: string): Promise<Address>;

    /**
     * @description Função responsável por buscar e retornar o endereço de determinada empresa
     * @param company_id string - id da empresa
     * @return Address - Retorna o endereço procurado
     */
    findAddressByCompany(company_id: string): Promise<Address>;

    /**
     * @description Dado as coordenadas retorna um endereço
     * @param lat number - Latitude 
     * @param long number - Longitude
     * @return Address - Retorna a localização
     */
    findAddressByCoords(lat: number, long: number): Promise<Address>;

    /**
     * @description Dado o cep de uma localização, retorna as suas coordenadas
     * @param cep string - CEP da localização desejada
     * @return number[] - Retorna um array com a latitude e longitude
     */
    findCoordsByAddress(cep: string): Promise<number[]>;

    /**
     * @description Função que faz a atualização na tabela address 
     * @param data ICreateAddressDTO - Recebe um DTO com seus atributos que que serão atualizados
     * @return Addreess - Retorna o endereço atualizado 
     */
    update(data: ICreateAddressDTO): Promise<Address>;

    /**
     * @description Recebe um id de um endereço e remove do banco de dados
     * @param id string - Rece o id de um endereço
     */
    delete(id: string): Promise<void>;
}