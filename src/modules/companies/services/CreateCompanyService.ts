import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Company } from "../infra/prisma/entities/Company";
import { Schedule } from "../infra/prisma/entities/Schedule";
import { SchedulesRepository } from "../infra/prisma/repositories/SchedulesRepository";
import { ServicesOfferedRepository } from "../infra/prisma/repositories/ServicesOfferedRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

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
        private scheduleRepository: SchedulesRepository,

    ) { }

    public async execute({
        name,
        cnpj,
        category,
        description,
        services,
        schedules,
        physical_localization,
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

        console.log(schedules);

        schedules.map(async (schedule) => {
            const { day_of_week, opening_time, closing_time, lunch_time } = schedule;

            this.scheduleRepository.create({
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