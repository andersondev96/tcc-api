export class Company {
  id?: string;
  name: string;
  cnpj: string;
  category: string;
  description: string;
  stars?: number;
  services: string[];
  physical_localization: boolean;
  user_id: string;
  contact_id: string;


  constructor(
    {
      name,
      cnpj,
      category,
      description,
      services,
      stars,
      physical_localization,
      contact_id,
      user_id
    }: Company) {
    return Object.assign(this, {
      name,
      cnpj,
      category,
      description,
      services,
      stars,
      physical_localization,
      contact_id,
      user_id
    });
  }
}