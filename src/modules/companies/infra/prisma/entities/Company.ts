
import { User } from "@modules/users/infra/prisma/entities/User";

import { Entrepreneur } from "../../../../entrepreneurs/infra/prisma/entities/Entrepreneur";
import { Address } from "./Address";
import { Contact } from "./Contact";
import { ImageCompany } from "./ImageCompany";
import { Schedule } from "./Schedule";

export class Company {
  id?: string;
  name: string;
  cnpj?: string;
  category_id: string;
  description?: string;
  stars?: number;
  favorites?: number;
  services?: string[];
  physical_localization: boolean;
  user_id: string;
  contact_id: string;
  contact?: Contact;
  address?: Address;
  ImageCompany?: ImageCompany[];
  schedule?: Schedule;
  entrepreneur?: Entrepreneur;
  user?: User;


  constructor(
    {
      name,
      cnpj,
      category_id,
      description,
      services,
      stars,
      favorites,
      physical_localization,
      contact_id,
      user_id,
      contact,
      address,
      ImageCompany,
      schedule,
      entrepreneur,
      user

    }: Company) {
    return Object.assign(this, {
      name,
      cnpj,
      category_id,
      description,
      services,
      stars,
      favorites,
      physical_localization,
      contact_id,
      user_id,
      contact,
      address,
      ImageCompany,
      schedule,
      entrepreneur,
      user
    });
  }
}