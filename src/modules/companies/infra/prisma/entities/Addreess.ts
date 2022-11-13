export class Address {
    id?: string;
    cep: string;
    street: string;
    district: string;
    number: number;
    state: string;
    city: string;
    company_id: string;

    constructor({ cep, street, district, number, state, city, company_id }: Address) {
        return Object.assign(this, {
            cep,
            street,
            district,
            number,
            state,
            city,
            company_id
        });
    };

}