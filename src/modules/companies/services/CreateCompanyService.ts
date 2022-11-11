import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Company } from "../infra/prisma/entities/Company";
import { ServicesOfferedRepository } from "../infra/prisma/repositories/ServicesOfferedRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

interface IRequest {
    name: string;
    cnpj: string;
    category: string;
    description: string;
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

    ) { }

    public async execute({
        name,
        cnpj,
        category,
        description,
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
            physical_localization,
            contact_id: contact.id,
            user_id
        });

        return company;
    }

}