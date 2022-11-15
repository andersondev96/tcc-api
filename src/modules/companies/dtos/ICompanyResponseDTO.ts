import { Address } from "../infra/prisma/entities/Address";
import { ImageCompany } from "../infra/prisma/entities/ImageCompany";
import { Schedule } from "../infra/prisma/entities/Schedule";

interface IAddress {
    cep: string;
    street: string;
    district: string;
    number: number;
    state: string;
    city: string;
}


export interface ICompanyResponseDTO {
    id: string;
    name: string;
    cnpj: string;
    category: string;
    description: string;
    services: string[];
    contact: {
        telephone: string;
        whatsapp: string;
        email: string;
        website: string
    }
    physical_localization: boolean;
    address: IAddress;
    schedules: Schedule[],
    images: ImageCompany[],


}