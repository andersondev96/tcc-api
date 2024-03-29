import { v4 as uuid } from "uuid";

import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { Company } from "@modules/companies/infra/prisma/entities/Company";

import { ICompaniesRepository } from "../ICompaniesRepository";

export class FakeCompaniesRepository implements ICompaniesRepository {

  private companies: Company[] = [];

  public async create(data: ICreateCompanyDTO): Promise<Company> {
    Object.assign(data, {
      id: uuid()
    });

    this.companies.push(data);

    return data;
  }

  public async listAll(): Promise<Company[]> {
    return this.companies;
  }

  public async findByName(name: string): Promise<Company> {
    const findCompanyByName = this.companies.find((company) => company.name === name);

    return findCompanyByName;
  }

  public async findByContactId(contact_id: string): Promise<Company> {
    const findCompanyByContact = this.companies.find((company) => company.contact_id === contact_id);

    return findCompanyByContact;
  }

  public async findByUser(user_id: string): Promise<Company> {
    const findCompanyByUser = this.companies.find((company) => company.user_id === user_id);

    return findCompanyByUser;
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

  public async updateStars(company_id: string, stars: number): Promise<Company> {
    const index = this.companies.findIndex(findCompany => findCompany.id === company_id);

    this.companies[index].stars = stars;

    return this.companies[index];
  }

  public async favoriteCompany(company_id: string): Promise<Company> {
    const index = this.companies.findIndex(findCompany => findCompany.id === company_id);

    if (!this.companies[index].favorites) {
      this.companies[index].favorites = 0;
    }

    this.companies[index].favorites += 1;

    return this.companies[index];
  }

  public async unfavoriteCompany(company_id: string): Promise<Company> {
    const index = this.companies.findIndex(findCompany => findCompany.id === company_id);

    if (!this.companies[index].favorites) {
      this.companies[index].favorites = 0;
    }

    this.companies[index].favorites -= 1;

    return this.companies[index];
  }


  public async delete(id: string): Promise<void> {
    const index = this.companies.findIndex(
      company => company.id === id
    );

    this.companies.splice(index, 1);
  }

}