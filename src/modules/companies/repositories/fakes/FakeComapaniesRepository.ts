import { v4 as uuid } from "uuid";

import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { Company } from "@modules/companies/infra/prisma/entities/Company";
import { ICompaniesRepository } from "../ICompaniesRepository";

export class FakeCompaniesRepository implements ICompaniesRepository {

    private companies: Company[] = [];

    public async create(data: ICreateCompanyDTO): Promise<Company> {
        Object.assign(data, {
            id: uuid(),
        });

        this.companies.push(data);

        return data;
    }

    public async listAll(): Promise<Company[]> {
        return this.companies;
    }

    public async listByLocalization(latitude: number, longitude: number): Promise<Company[]> {
        throw new Error("Method not implemented.");
    }

    public async listByFilter(category?: string, state?: string, city?: string, price?: number): Promise<Company[]> {
        throw new Error("Method not implemented.");
    }

    public async findByName(name: string): Promise<Company> {
        const findCompanyByName = this.companies.find((company) => company.name === name);

        return findCompanyByName;
    }

    public async findByContactId(contact_id: string): Promise<Company> {
        const findCompanyByContact = this.companies.find((company) => company.contact_id === contact_id);

        return findCompanyByContact;
    }

    public async findById(id: string): Promise<Company> {
        const findCompanyById = this.companies.find((company) => company.id === id);

        return findCompanyById;
    }

    public async update(company: ICreateCompanyDTO): Promise<Company> {
        const index = this.companies.findIndex(findUser => findUser.id === company.id);

        this.companies[index] = company;

        return company;
    }

    public async delete(id: string): Promise<void> {
        const index = this.companies.findIndex(
            company => company.id === id
        );

        this.companies.splice(index, 1);
    }

}