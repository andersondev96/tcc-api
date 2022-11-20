export interface ICreateServiceDTO {
    id?: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image_url?: string;
    highlight_service?: boolean;
    favorites?: number;
    stars?: number;
    assessments?: number;
    company_id: string;
}