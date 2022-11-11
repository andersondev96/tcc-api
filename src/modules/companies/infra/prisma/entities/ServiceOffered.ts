export class ServiceOffered {
    id?: string;
    description: string;

    constructor({ description }: ServiceOffered) {
        return Object.assign(this, {
            description
        });
    }
}