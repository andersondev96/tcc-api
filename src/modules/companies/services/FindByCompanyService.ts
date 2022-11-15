import { Schedule } from "@prisma/client";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Company } from "../infra/prisma/entities/Company";
import { Contact } from "../infra/prisma/entities/Contact";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

interface IResponse {
    company: Company;
    contact: Contact;
}

@injectable()
export class FindByCompanyService {
    constructor(
        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

        @inject("ContactsRepository")
        private contactRepository: IContactsRepository,
    ) { }

    public async execute(id: string): Promise<IResponse> {

        const company = await this.companyRepository.findById(id);

        if (!company) {
            throw new AppError("Company does not exist");
        }

        const contact = await this.contactRepository.findById(company.contact_id);

        return {
            company,
            contact,
        };
    }
}