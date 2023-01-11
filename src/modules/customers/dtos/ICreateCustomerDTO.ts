import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";

export interface ICreateCustomerDTO {
  id?: string;
  user_id: string;
  telephone?: string;
  status?: string;
  user?: ICreateUserDTO;
}