import { v4 as uuid } from "uuid";

import { ICreateEntrepreneurDTO } from "@modules/companies/dtos/ICreateEntrepreneurDTO";
import { Entrepreneur } from "@modules/companies/infra/prisma/entities/Entrepreneur";

import { IEntrepreneursRepository } from "../IEntrepreneursRepository";

export class FakeEntrepreneursRepository implements IEntrepreneursRepository {

  entrepreneurs: Entrepreneur[] = [];

  public async create(data: ICreateEntrepreneurDTO): Promise<Entrepreneur> {
    Object.assign(data, {
      id: uuid()
    });

    this.entrepreneurs.push(data);

    return data;
  }

  public async findById(id: string): Promise<Entrepreneur> {
    const findEntrepreneurById = this.entrepreneurs.find((entrepreneur) => entrepreneur.id === id);

    return findEntrepreneurById;
  }

  public async findByUser(user_id: string): Promise<Entrepreneur> {
    const findEntrepreneurByUser = this.entrepreneurs.find((entrepreneur) => entrepreneur.user_id === user_id);

    return findEntrepreneurByUser;
  }

  public async findByCompany(company_id: string): Promise<Entrepreneur> {
    const findEntrepreneurByCompany = this.entrepreneurs.find((entrepreneur) => entrepreneur.company_id === company_id);

    return findEntrepreneurByCompany;
  }

  public async update(data: ICreateEntrepreneurDTO): Promise<Entrepreneur> {
    const index = this.entrepreneurs.findIndex((entrepreneur) => entrepreneur.id === data.id);

    this.entrepreneurs[index] = data;

    return data;
  }

  public async delete(id: string): Promise<void> {
    const index = this.entrepreneurs.findIndex((entrepreneur) => entrepreneur.id === id);

    this.entrepreneurs.splice(index, 1);
  }

}