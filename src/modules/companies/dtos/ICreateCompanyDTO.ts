export interface ICreateCompanyDTO {
  id?: string;
  name: string;
  cnpj: string;
  category_id: string;
  description?: string;
  services?: string[];
  physical_localization: boolean;
  user_id: string;
  contact_id: string;
  stars?: number;

}