export class ImageCompany {
    id?: string;
    title?: string;
    image_name: string;
    image_url: string;
    company_id: string;

    constructor({ image_name, image_url, company_id }: ImageCompany) {
        return Object.assign(this, {
            image_name,
            image_url,
            company_id
        });
    }
}