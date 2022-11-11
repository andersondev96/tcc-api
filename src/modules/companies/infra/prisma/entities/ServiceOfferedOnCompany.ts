export class ServiceOfferedOnCompany {
    company_id: string;
    service_offered_id: string;

    constructor({ company_id, service_offered_id }: ServiceOfferedOnCompany) {
        return Object.assign(this, {
            company_id,
            service_offered_id
        });
    }
}