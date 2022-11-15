import { prisma } from "@database/prisma";
import { ICreateAddressDTO } from "@modules/companies/dtos/ICreateAddressDTO";
import { IAddressesRepository } from "@modules/companies/repositories/IAddressesRepository";
import { Address } from "../entities/Address";

export class AddressesRepository implements IAddressesRepository {

    public async create({
        id,
        cep,
        street,
        district,
        number,
        state,
        city,
        company_id
    }: ICreateAddressDTO): Promise<Address> {
        const address = await prisma.address.create({
            data: {
                id,
                cep,
                street,
                district,
                number,
                state,
                city,
                company_id
            }
        });

        return address;
    }

    public async findByAddress(id: string): Promise<Address> {
        const address = await prisma.address.findUnique({
            where: { id },
        });

        return address;
    }

    public async findAddressByCompany(company_id: string): Promise<Address> {
        const findAddress = await prisma.address.findUnique({
            where: { company_id },
        });

        return findAddress;
    }

    public async findAddressByCoords(lat: number, long: number): Promise<Address> {
        throw new Error("Method not implemented.");
    }
    public async findCoordsByAddress(cep: string): Promise<number[]> {
        throw new Error("Method not implemented.");
    }

    public async update(data: ICreateAddressDTO): Promise<Address> {
        const updateAddress = await prisma.address.update({
            where: { id: data.id },
            data: { ...data },
        });

        return updateAddress;
    }
    public async delete(id: string): Promise<void> {
        await prisma.address.delete({
            where: { id }
        });
    }

}