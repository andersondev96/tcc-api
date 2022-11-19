import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { Company } from "../infra/prisma/entities/Company";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";
import { IAddressesRepository } from "../repositories/IAddressesRepository";

interface IAddress {
    cep: string;
    street: string;
    district: string;
    number: number;
    state: string;
    city: string;
}
interface ISchedule {
    day_of_week: string,
    opening_time: string,
    closing_time: string,
    lunch_time: string,
}
interface IRequest {
    name: string;
    cnpj: string;
    category: string;
    description: string;
    services: string[];
    schedules: ISchedule[];
    physical_localization: boolean,
    address?: IAddress,
    telephone: string,
    whatsapp: string,
    email: string,
    website: string,
    user_id: string;
}

@injectable()
export class CreateCompanyService {

    constructor(
        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

        @inject("UsersRepository")
        private userRepository: IUsersRepository,

        @inject("ContactsRepository")
        private contactRepository: IContactsRepository,

        @inject("SchedulesRepository")
        private scheduleRepository: ISchedulesRepository,

        @inject("AddressesRepository")
        private addressRepository: IAddressesRepository,

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
        user_id,
    }: IRequest): Promise<Company> {

        const user = await this.userRepository.findById(user_id);

        if (!user) {
            throw new AppError("This user does not exist");
        }

        const checkCompanyExists = await this.companyRepository.findByName(name);

        if (checkCompanyExists) {
            throw new AppError("Company already exists");
        }


        if (services.length === 0 || services.length > 3) {
            throw new AppError("The number of services must not equal a 0 or exceed 3");
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

        if (company.physical_localization) {
            await this.addressRepository.create({
                cep: address.cep,
                street: address.street,
                district: address.district,
                number: address.number,
                state: address.state,
                city: address.city,
                company_id: company.id,
            });
        }

        schedules.map(async (schedule) => {
            const { day_of_week, opening_time, closing_time, lunch_time } = schedule;

            await this.scheduleRepository.create({
                day_of_week,
                opening_time,
                closing_time,
                lunch_time,
                company_id: company.id,
            });
        });

        return company;
    }

}