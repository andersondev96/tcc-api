
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Address } from "../infra/prisma/entities/Addreess";
import { Company } from "../infra/prisma/entities/Company";
import { Contact } from "../infra/prisma/entities/Contact";
import { Schedule } from "../infra/prisma/entities/Schedule";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

interface IResponse {
    company: Company;
    contact: Contact;
    schedules: Schedule[];
    address: Address;
}

@injectable()
export class FindByCompanyService {
    constructor(
        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

        @inject("ContactsRepository")
        private contactRepository: IContactsRepository,

        @inject("SchedulesRepository")
        private scheduleRepository: ISchedulesRepository,

        @inject("AddressesRepository")
        private addressRepository: IAddressesRepository
    ) { }

    public async execute(id: string): Promise<IResponse> {

        const company = await this.companyRepository.findById(id);

        if (!company) {
            throw new AppError("Company does not exist");
        }

        const contact = await this.contactRepository.findById(company.contact_id);

        const schedules = await this.scheduleRepository.findSchedulesByCompany(company.id);

        const address = await this.addressRepository.findAddressByCompany(company.id);

        return {
            company,
            contact,
            schedules,
            address
        };
    }
}