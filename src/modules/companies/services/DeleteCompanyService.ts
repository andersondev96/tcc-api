import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";

@injectable()
export class DeleteCompanyService {

    constructor(
        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,

        @inject("ContactsRepository")
        private contactRepository: IContactsRepository,
    ) { }

    public async execute(company_id: string): Promise<void> {

        const company = await this.companyRepository.findById(company_id);

        const contact = company.contact_id;

        if (!company) {
            throw new AppError("Company does not exist");
        }

        await this.companyRepository.delete(company.id);

        await this.contactRepository.delete(contact);
    }
}