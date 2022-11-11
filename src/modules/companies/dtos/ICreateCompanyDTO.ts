export interface ICreateCompanyDTO {
    name: string;
    cnpj: string;
    category: string;
    description: string;
    services: string[];
    physical_localization: boolean;
    user_id: string;
    contact_id: string;
    id?: string;

}