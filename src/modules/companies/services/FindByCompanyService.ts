
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICompanyResponseDTO } from "../dtos/ICompanyResponseDTO";
import { Address } from "../infra/prisma/entities/Address";
import { Company } from "../infra/prisma/entities/Company";
import { Contact } from "../infra/prisma/entities/Contact";
import { ImageCompany } from "../infra/prisma/entities/ImageCompany";
import { Schedule } from "../infra/prisma/entities/Schedule";
import { CompanyMap } from "../mapper/CompanyMap";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";


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
        private addressRepository: IAddressesRepository,

        @inject("ImagesCompanyRepository")
        private imageCompanyRepository: IImagesCompanyRepository

    ) { }

    public async execute(id: string): Promise<ICompanyResponseDTO> {

        const company = await this.companyRepository.findById(id);

        if (!company) {
            throw new AppError("Company does not exist");
        }

        const contact = await this.contactRepository.findById(company.contact_id);

        const schedules = await this.scheduleRepository.findSchedulesByCompany(company.id);

        const address = await this.addressRepository.findAddressByCompany(company.id);

        const images = await this.imageCompanyRepository.findImagesByCompany(company.id);

        const response = {
            id: company.id,
            name: company.name,
            cnpj: company.cnpj,
            category: company.category,
            description: company.description,
            services: company.services,
            telephone: contact.telephone,
            whatsapp: contact.whatsapp,
            email: contact.email,
            website: contact.website,
            physical_localization: company.physical_localization,
            cep: address.cep,
            street: address.street,
            district: address.district,
            number: address.number,
            state: address.state,
            city: address.city,
            schedules,
            images,
        }

        return CompanyMap.toDTO(response);
    }
}