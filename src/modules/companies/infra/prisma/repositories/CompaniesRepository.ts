import { prisma } from "@database/prisma";
import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { Company } from "../entities/Company";

export class CompaniesRepository implements ICompaniesRepository {

    public async create({
        id,
        name,
        cnpj,
        category,
        description,
        services,
        physical_localization,
        user_id,
        contact_id,
    }: ICreateCompanyDTO): Promise<Company> {
        const company = await prisma.company.create({
            data: {
                id,
                name,
                cnpj,
                category,
                services,
                description,
                physical_localization,
                user_id,
                contact_id,
            },
        });

        return company;
    }

    public async listAll(): Promise<Company[]> {
        const listAllCompanies = await prisma.company.findMany({
            include: {
                contact: true,
                Address: true,
                ImageCompany: true,
                Schedule: true,
            }
        });

        console.log(listAllCompanies);

        return listAllCompanies;
    }

    public async listByLocalization(latitude: number, longitude: number): Promise<Company[] | undefined> {
        throw new Error("Method not implemented.");
    }

    public async listByFilter(category?: string, state?: string, city?: string, price?: number): Promise<Company[] | undefined> {
        throw new Error("Method not implemented.");
    }

    public async findByName(name: string): Promise<Company> {
        const listCompanyByName = await prisma.company.findFirst({
            where: { name },
        });

        return listCompanyByName;
    }

    public async findByContactId(contact_id: string): Promise<Company> {
        const findCompanyByContact = await prisma.company.findUnique({
            where: { contact_id },
        });

        return findCompanyByContact;
    }

    public async findById(id: string): Promise<Company> {
        const company = await prisma.company.findUnique({
            where: { id },
            include: {
                contact: true,
                Address: true,
                ImageCompany: true,
                Schedule: true,
            }
        });

        return company;
    }

    public async update(company: ICreateCompanyDTO): Promise<Company> {
        const updateCompany = await prisma.company.update({
            where: { id: company.id },
            data: { ...company },
        });

        return updateCompany;
    }

    public async delete(id: string): Promise<void> {
        await prisma.company.delete({
            where: { id },
        });
    }

}