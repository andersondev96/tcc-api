export class Contact {
    id?: string;
    telephone: string;
    whatsapp?: string;
    email: string;
    website?: string;

    constructor({ telephone, email }: Contact) {
        return Object.assign(this, {
            telephone,
            email
        });
    }
}