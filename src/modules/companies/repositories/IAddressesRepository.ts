import { ICreateAddressDTO } from "../dtos/ICreateAddressDTO";
import { Address } from "../infra/prisma/entities/Address";

export interface IAddressesRepository {


  create(data: ICreateAddressDTO): Promise<Address>;

  findByAddress(id: string): Promise<Address>;

  findAddressByCompany(company_id: string): Promise<Address>;

  findAddressByCoords(lat: number, long: number): Promise<Address>;

  findCoordsByAddress(cep: string): Promise<number[]>;

  update(data: ICreateAddressDTO): Promise<Address>;

  delete(id: string): Promise<void>;
}