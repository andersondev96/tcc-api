import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";
import { Service } from "../infra/prisma/entities/Service";
import { IServicesRepository } from "../repositories/IServicesRepository";

interface IRequest {
    company_id: string;
    category: string;
}
@injectable()
export class FindServiceByCategoryService {

    constructor(
        @inject("ServicesRepository")
        private serviceRepository: IServicesRepository,

        @inject("CompaniesRepository")
        private companyRepository: ICompaniesRepository,
    ) { }

    public async execute({ company_id, category }: IRequest): Promise<Service[]> {

        const company = await this.companyRepository.findById(company_id);

        if (!company) {
            throw new AppError("Company does not exist");
        }

        const services = await this.serviceRepository.listServicesByCategory(company_id, category);

        return services;
    }
}