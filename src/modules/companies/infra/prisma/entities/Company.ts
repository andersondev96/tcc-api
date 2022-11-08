export class Company {
    id?: string;
    name: string;
    cnpj: string;
    category: string;
    description: string;
    physical_localization: boolean;
    user_id: string;

    constructor(
        {
            name,
            cnpj,
            category,
            description,
            physical_localization,
            user_id
        }: Company) {
        return Object.assign(this, {
            name,
            cnpj,
            category,
            description,
            physical_localization,
            user_id
        });
    }
}