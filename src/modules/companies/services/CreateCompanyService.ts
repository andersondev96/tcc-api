import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

import { Company } from "../infra/prisma/entities/Company";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IEntrepreneursRepository } from "../repositories/IEntrepreneursRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
interface IAddress {
  cep: string
  street: string
  district: string
  number: number
  state: string
  city: string
}

interface ISchedule {
  weekday: string
  opening_time: string
  closing_time: string
  lunch_time: string
}
interface IRequest {
  name: string
  cnpj: string
  category: string
  description?: string
  services?: string[]
  schedules?: ISchedule[]
  physical_localization: boolean
  address?: IAddress
  telephone: string
  whatsapp?: string
  email: string
  website?: string
  user_id: string
}

@injectable()
export class CreateCompanyService {
  constructor(
    @inject("CompaniesRepository")
    private readonly companyRepository: ICompaniesRepository,

    @inject("UsersRepository")
    private readonly userRepository: IUsersRepository,

    @inject("ContactsRepository")
    private readonly contactRepository: IContactsRepository,

    @inject("SchedulesRepository")
    private readonly scheduleRepository: ISchedulesRepository,

    @inject("AddressesRepository")
    private readonly addressRepository: IAddressesRepository,

    @inject("EntrepreneursRepository")
    private readonly entrepreneurRepository: IEntrepreneursRepository

  ) { }

  public async execute({
    name,
    cnpj,
    category,
    description,
    services,
    schedules,
    physical_localization,
    address,
    telephone,
    whatsapp,
    email,
    website,
    user_id
  }: IRequest): Promise<Company> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError("This user does not exist");
    }

    const userHasCompany = await this.companyRepository.findByUser(user_id);

    if (userHasCompany) {
      throw new AppError("User has a company");
    }

    const checkCompanyExists = await this.companyRepository.findByName(name);

    if (checkCompanyExists) {
      throw new AppError("Company already exists");
    }

    if (physical_localization && address === undefined) {
      throw new AppError("Address is required");
    }

    const contact = await this.contactRepository.create({
      telephone,
      whatsapp,
      email,
      website
    });

    const company = await this.companyRepository.create({
      name,
      cnpj,
      category,
      description,
      services,
      physical_localization,
      contact_id: contact.id,
      user_id
    });

    const entrepreneur = await this.entrepreneurRepository.findByUser(user_id);

    if (entrepreneur) {
      await this.entrepreneurRepository.update({
        id: entrepreneur.id,
        user_id: user.id,
        company_id: company.id
      });
    }

    if (company.physical_localization) {
      await this.addressRepository.create({
        cep: address.cep,
        street: address.street,
        district: address.district,
        number: address.number,
        state: address.state,
        city: address.city,
        company_id: company.id
      });
    }


    if (schedules) {
      schedules.map(async (schedule) => {
        const { weekday, opening_time, closing_time, lunch_time } = schedule;

        await this.scheduleRepository.create({
          weekday,
          opening_time,
          closing_time,
          lunch_time,
          company_id: company.id
        });
      });
    }


    return company;
  }
}
