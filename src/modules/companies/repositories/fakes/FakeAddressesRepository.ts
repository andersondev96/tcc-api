import { v4 as uuid } from "uuid";
import { ICreateAddressDTO } from "@modules/companies/dtos/ICreateAddressDTO";
import { Address } from "@modules/companies/infra/prisma/entities/Addreess";
import { IAddressesRepository } from "../IAddressesRepository";

export class FakeAddressesRepository implements IAddressesRepository {

    addresses: Address[] = [];

    public async create(data: ICreateAddressDTO): Promise<Address> {
        Object.assign(data, {
            id: uuid(),
        });

        this.addresses.push(data);

        return data;
    }

    public async findByAddress(id: string): Promise<Address> {
        const findAddress = this.addresses.find((address) => address.id === id);

        return findAddress;
    }



    public async findAddressByCoords(lat: number, long: number): Promise<Address> {
        throw new Error("Method not implemented.");
    }

    public async findCoordsByAddress(cep: string): Promise<number[]> {
        throw new Error("Method not implemented.");
    }

    public async update(data: ICreateAddressDTO): Promise<Address> {
        const index = this.addresses.findIndex((address) => address.id === data.id);

        this.addresses[index] = data;

        return data;
    }

    public async delete(id: string): Promise<void> {
        const index = this.addresses.findIndex((address) => address.id === id);

        this.addresses.splice(index, 1);

    }

    public async findAddressByCompany(company_id: string): Promise<Address> {
        const address = this.addresses.find((address) => address.company_id === company_id);

        return address;
    }

}