import { Company } from "@modules/companies/infra/prisma/entities/Company";

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
  company?: Company;

  constructor({ name, description, price, category, company_id, company }: Service) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.category = category;
    this.company_id = company_id;
    this.company = company;
  }
}