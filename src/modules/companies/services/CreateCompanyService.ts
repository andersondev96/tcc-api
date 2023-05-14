import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { getCEP } from "@shared/utils/getCEP";
import { getCoordinatesFromCEP } from "@shared/utils/getCoordinatesFromCEP";
import { getAddressFromCoordinates, getCurrentLocalization } from "@shared/utils/getCurrentLocalization";

import { ICacheProvider } from "@shared/container/providers/CacheProvider/models/ICacheProvider";
import { IEntrepreneursRepository } from "../../entrepreneurs/repositories/IEntrepreneursRepository";
import { Company } from "../infra/prisma/entities/Company";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
interface ISchedule {
  weekday: string
  opening_time: string
  closing_time: string
  lunch_time: string
}
interface IRequest {
  name: string
  cnpj?: string
  category_id: string
  description?: string
  services?: string[]
  schedules?: ISchedule[]
  physical_localization: boolean,
  cep?: string
  street?: string
  district?: string
  number?: number
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
    private companyRepository: ICompaniesRepository,

    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("UsersRepository")
    private userRepository: IUsersRepository,

    @inject("ContactsRepository")
    private contactRepository: IContactsRepository,

    @inject("SchedulesRepository")
    private scheduleRepository: ISchedulesRepository,

    @inject("AddressesRepository")
    private addressRepository: IAddressesRepository,

    @inject("EntrepreneursRepository")
    private entrepreneurRepository: IEntrepreneursRepository,

    @inject("CacheProvider")
    private cacheProvider: ICacheProvider,

  ) { }

  public async execute({
    name,
    cnpj,
    category_id,
    description,
    services,
    schedules,
    physical_localization,
    cep,
    street,
    district,
    number,
    telephone,
    whatsapp,
    email,
    website,
    user_id
  }: IRequest): Promise<Company> {

    try {
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

      const checkCategoryExists = await this.categoryRepository.findCategoryById(category_id);

      if (!checkCategoryExists) {
        throw new AppError("Category not found");
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
        category_id,
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
        const coords = await getCoordinatesFromCEP(cep);

        const address = await getCEP(cep);

        if (!coords) {
          throw new AppError("CEP not found");
        }

        await this.addressRepository.create({
          cep,
          street: address.street || street,
          district: address.district || district,
          number,
          state: address.state,
          city: address.city,
          latitude: coords.lat,
          longitude: coords.lng,
          company_id: company.id
        });
      }

      if (!physical_localization) {
        const coords = await getCurrentLocalization();

        if (coords) {
          const address = await getAddressFromCoordinates(coords);

          await this.addressRepository.create({
            cep,
            street: address.street || street,
            district: address.district || district,
            number,
            state: address.state,
            city: address.city,
            latitude: coords.lat,
            longitude: coords.lng,
            company_id: company.id
          });
        }

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

      await this.cacheProvider.invalidatePrefix(`companies-list`)

      return company;
    } catch (error) {
      throw new AppError(error.message);
    }
  }
}
