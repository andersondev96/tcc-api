export class Service {
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

  constructor({ name, description, price, category, company_id }: Service) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.company_id = company_id;
  }
}