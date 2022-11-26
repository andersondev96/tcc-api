export class Entrepreneur {
    id?: string;
    user_id: string;
    company_id?: string;

    constructor({ user_id }: Entrepreneur) {
        return Object.assign(this, {
            user_id
        });
    }
}