import { prisma } from "@database/prisma";
import { ICreateEntrepreneurDTO } from "@modules/companies/dtos/ICreateEntrepreneurDTO";
import { IEntrepreneursRepository } from "@modules/companies/repositories/IEntrepreneursRepository";

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
      where: { id }
    });

    return entrepreneur;
  }

  public async findByUser(user_id: string): Promise<Entrepreneur> {
    const entrepreneur = await prisma.entrepreneur.findUnique({
      where: { user_id }
    });

    return entrepreneur;
  }

  public async findByCompany(company_id: string): Promise<Entrepreneur> {
    const company = await prisma.entrepreneur.findUnique({
      where: { company_id }
    });

    return company;
  }

  public async update(data: ICreateEntrepreneurDTO): Promise<Entrepreneur> {
    const entrepreneur = await prisma.entrepreneur.update({
      where: { id: data.id },
      data: { ...data }
    });

    return entrepreneur;
  }

  public async delete(id: string): Promise<void> {
    await prisma.entrepreneur.delete({
      where: { id }
    });
  }

}