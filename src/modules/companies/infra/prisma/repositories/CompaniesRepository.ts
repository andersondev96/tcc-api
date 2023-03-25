import { prisma } from "@database/prisma";
import { ICreateCompanyDTO } from "@modules/companies/dtos/ICreateCompanyDTO";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";

import { Company } from "../entities/Company";

export class CompaniesRepository implements ICompaniesRepository {

  public async create({
    id,
    name,
    cnpj,
    category_id,
    description,
    services,
    physical_localization,
    user_id,
    contact_id
  }: ICreateCompanyDTO): Promise<Company> {
    const company = await prisma.company.create({
      data: {
        id,
        name,
        cnpj,
        category_id,
        services,
        description,
        physical_localization,
        user_id,
        contact_id
      }
    });

    return company;
  }

  public async listAll(): Promise<Company[]> {
    const listAllCompanies = await prisma.company.findMany({
      include: {
        contact: true,
        Address: true,
        ImageCompany: true,
        Schedule: true
      }
    });

    return listAllCompanies;
  }

  public async findByName(name: string): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: { name }
    });

    return company;
  }

  public async findByContactId(contact_id: string): Promise<Company> {
    const findCompanyByContact = await prisma.company.findUnique({
      where: { contact_id }
    });

    return findCompanyByContact;
  }

  public async findByUser(user_id: string): Promise<Company> {
    const findCompanyByUser = await prisma.company.findUnique({
      where: { user_id },
      include: {
        contact: true,
        Address: true,
        ImageCompany: true,
        Schedule: true
      }
    });

    return findCompanyByUser;
  }

  public async findById(id: string): Promise<Company> {
    const company = await prisma.company.findUnique({
      where: { id },
      include: {
        contact: true,
        Address: true,
        ImageCompany: true,
        Schedule: true
      }
    });

    return company;
  }

  public async update(company: ICreateCompanyDTO): Promise<Company> {
    const updateCompany = await prisma.company.update({
      where: { id: company.id },
      data: { ...company }
    });

    return updateCompany;
  }

  public async updateStars(company_id: string, stars: number): Promise<Company> {
    const updateCompany = await prisma.company.update({
      where: { id: company_id },
      data: {
        stars
      }
    });

    return updateCompany;
  }

  public async favoriteCompany(company_id: string): Promise<Company> {
    const addFavorite = await prisma.company.update({
      where: { id: company_id },
      data: {
        favorites: {
          increment: 1
        }
      }
    });

    return addFavorite;
  }

  public async unfavoriteCompany(company_id: string): Promise<Company> {
    const removeFavorite = await prisma.company.update({
      where: { id: company_id },
      data: {
        favorites: {
          decrement: 1
        }
      }
    });

    return removeFavorite;
  }


  public async delete(id: string): Promise<void> {
    await prisma.company.delete({
      where: { id }
    });
  }

}