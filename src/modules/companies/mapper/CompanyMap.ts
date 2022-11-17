import { ICompanyResponseDTO } from "../dtos/ICompanyResponseDTO";

export class CompanyMap {

    static toDTO({
        id,
        name,
        cnpj,
        category,
        description,
        services,
        telephone,
        whatsapp,
        email,
        website,
        physical_localization,
        address,
        schedules,
        images,
    }): ICompanyResponseDTO {

        const company = {
            id,
            name,
            cnpj,
            category,
            description,
            services,
            contact: {
                telephone,
                whatsapp,
                email,
                website,
            },
            physical_localization,
            address,
            schedules,
            images
        }

        return company;
    }
}