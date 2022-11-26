import { ICreateEntrepreneurDTO } from "@modules/entrepreneurs/dtos/ICreateEntrepreneurDTO";
import { Entrepreneur } from "@modules/entrepreneurs/infra/prisma/entities/Entrepreneur";
import { v4 as uuid } from "uuid";
import { IEntrepreneursRepository } from "../IEntrepreneursRepository";

export class FakeEntrepreneursRepository implements IEntrepreneursRepository {

    entrepreneurs: Entrepreneur[] = [];

    public async create(data: ICreateEntrepreneurDTO): Promise<Entrepreneur> {
        Object.assign(data, {
            id: uuid(),
        });

        this.entrepreneurs.push(data);

        return data;
    }

    public async findById(id: string): Promise<Entrepreneur> {
        const findEntrepreneurById = this.entrepreneurs.find((entrepreneur) => entrepreneur.id === id);

        return findEntrepreneurById;
    }

    public async delete(id: string): Promise<void> {
        const index = this.entrepreneurs.findIndex((entrepreneur) => entrepreneur.id === id);

        this.entrepreneurs.splice(index, 1);
    }

}