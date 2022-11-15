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
        cep,
        street,
        district,
        number,
        state,
        city,
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
            address: {
                cep,
                street,
                district,
                number,
                state,
                city,
            },
            schedules,
            images
        }

        return company;
    }
}