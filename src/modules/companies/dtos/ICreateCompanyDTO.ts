export interface ICreateCompanyDTO {
    name: string;
    cnpj: string;
    category: string;
    description: string;
    physical_localization: boolean;
    user_id: string;
    id?: string;
}