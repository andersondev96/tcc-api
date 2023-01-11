import { ICreateUserDTO } from "@modules/users/dtos/ICreateUserDTO";

export class Customer {
  id?: string;
  user_id: string;
  telephone?: string;
  status?: string;
  user?: ICreateUserDTO;

  constructor({ user_id, user }: Customer) {
    return Object.assign(this, {
      user_id,
      user
    });
  }
}