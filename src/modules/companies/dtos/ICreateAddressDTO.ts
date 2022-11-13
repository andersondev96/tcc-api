export interface ICreateAddressDTO {
    id?: string;
    cep: string;
    street: string;
    district: string;
    number: number;
    state: string;
    city: string;
    company_id: string;
}