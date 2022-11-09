export class Contact {
    id?: string;
    telephone: string;
    whatsapp?: string;
    email: string;
    website?: string;
    company_id: string;

    constructor({ telephone, email, company_id }: Contact) {
        return Object.assign(this, {
            telephone,
            email,
            company_id
        });
    }
}