
import { inject, injectable } from "tsyringe";
import { Company } from "../infra/prisma/entities/Company";
import { Contact } from "../infra/prisma/entities/Contact";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

@injectable()
export class ListAllCompaniesService {
    constructor(
        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

        @inject("ContactsRepository")
        private contactRepository: IContactsRepository,

        @inject("SchedulesRepository")
        private scheduleRepository: ISchedulesRepository,

        @inject("AddressesRepository")
        private addressRepository: IAddressesRepository,

        @inject("ImagesCompanyRepository")
        private imageCompanyRepository: IImagesCompanyRepository

    ) { }

    public async execute(): Promise<Company[]> {
        const contacts: Contact[] = [];

        const companies = await this.companyRepository.listAll();


        companies.map(async (company) => {
            const contact = await this.contactRepository.findById(company.contact_id);

            const images = await this.imageCompanyRepository.findImagesByCompany(company.id);

            return {
                company,
                contact,
                images
            }

        });

        return companies;
    }
}