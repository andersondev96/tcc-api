import { prisma } from "@database/prisma";
import { ICreateEntrepreneurDTO } from "@modules/entrepreneurs/dtos/ICreateEntrepreneurDTO";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { Entrepreneur } from "../entities/Entrepreneur";

export class EntrepreneursRepository implements IEntrepreneursRepository {
    public async create({
        id,
        user_id,
        company_id
    }: ICreateEntrepreneurDTO): Promise<Entrepreneur> {
        const entrepreneur = await prisma.entrepreneur.create({
            data: {
                id,
                user_id,
                company_id
            }
        });

        return entrepreneur;
    }

    public async findById(id: string): Promise<Entrepreneur> {
        const entrepreneur = await prisma.entrepreneur.findUnique({
            where: { id },
        });

        return entrepreneur;
    }

    public async delete(id: string): Promise<void> {
        await prisma.entrepreneur.delete({
            where: { id }
        });
    }

}