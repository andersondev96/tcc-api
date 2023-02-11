export interface ICreateAddressDTO {
  id?: string;
  cep: string;
  street: string;
  district: string;
  number: number;
  state: string;
  city: string;
  latitude: number;
  longitude: number;
  company_id: string;
}