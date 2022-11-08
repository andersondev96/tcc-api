import { prisma } from "@database/prisma";
import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { StringMap } from "ts-jest";
import { Company } from "../entities/Company";

export class CompanyRepository implements ICompaniesRepository {

    async create({
        id,
        name,
        cnpj,
        category,
        description,
        physical_localization,
        user_id,
    }: ICreateCompanyDTO): Promise<Company> {
        const company = await prisma.company.create({
            data: {
                id,
                name,
                cnpj,
                category,
                description,
                physical_localization,
                user_id
            },
        });

        return company;
    }

    async listAll(): Promise<Company[]> {
        const listAllCompanies = await prisma.company.findMany();

        return listAllCompanies;
    }

    async listByLocalization(latitude: number, longitude: number): Promise<Company[] | undefined> {
        throw new Error("Method not implemented.");
    }

    async listByFilter(category?: string, state?: string, city?: StringMap, price?: number): Promise<Company[] | undefined> {
        throw new Error("Method not implemented.");
    }

    async findByName(name: string): Promise<Company | undefined> {
        const listCompanyByName = await prisma.company.findFirst({
            where: { name },
        });

        return listCompanyByName;
    }

    async findById(id: string): Promise<Company | undefined> {
        const listCompanyById = await prisma.company.findUnique({
            where: { id },
        });

        return listCompanyById;
    }

    async update(company: ICreateCompanyDTO): Promise<Company> {
        const updateCompany = await prisma.company.update({
            where: { id: company.id },
            data: { ...company },
        });

        return updateCompany;
    }

    async delete(id: string): Promise<void> {
        await prisma.company.delete({
            where: { id },
        });
    }

}