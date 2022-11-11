import { v4 as uuid } from "uuid";

import { ICreateServicesOfferedOnCompanyDTO } from "@modules/companies/dtos/ICreateServicesOfferedOnCompanyDTO";

import { IServicesOfferedOnCompanyRepository } from "../IServicesOfferedOnCompanyRepository";
import { ServiceOfferedOnCompany } from "@modules/companies/infra/prisma/entities/ServiceOfferedOnCompany";

export class FakeServicesOfferedRepository implements IServicesOfferedOnCompanyRepository {

    servicesOfferedToCompany: ServiceOfferedOnCompany[] = [];

    public async linkCompanyToServiceOffered(data: ICreateServicesOfferedOnCompanyDTO): Promise<ServiceOfferedOnCompany> {
        Object.assign(data, {
            id: uuid(),
        });

        this.servicesOfferedToCompany.push(data);

        return data;
    }

    public async findServicesByCompany(company_id: string): Promise<ServiceOfferedOnCompany[]> {
        const services = this.servicesOfferedToCompany.filter((company) => company.company_id === company_id);

        return services;
    }

    public async findCompanyByServiceOffered(service_offered_id: string): Promise<ServiceOfferedOnCompany[]> {
        const companies = this.servicesOfferedToCompany.filter((service) => service.service_offered_id === service_offered_id);

        return companies;
    }

    public async contCompany(company_id: string): Promise<number> {
        const companies = this.servicesOfferedToCompany.findIndex((company) => company.company_id === company_id);

        return companies;
    }

    public async update(data: ICreateServicesOfferedOnCompanyDTO): Promise<ServiceOfferedOnCompany> {
        const index = this.servicesOfferedToCompany.findIndex
            (
                company =>
                    company.company_id === data.company_id &&
                    company.service_offered_id === data.service_offered_id
            );

        this.servicesOfferedToCompany[index] = data;

        return data;
    }

    public async unlinkCompany(company_id: string, service_offered_id: string): Promise<void> {
        const index = this.servicesOfferedToCompany.findIndex
            (
                company =>
                    company.company_id === company_id &&
                    company.service_offered_id === service_offered_id
            );

        this.servicesOfferedToCompany.splice(index, 1);

    }

}