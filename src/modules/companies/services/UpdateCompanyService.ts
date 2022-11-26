import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/errors/AppError";

import { Address } from "../infra/prisma/entities/Address";
import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";

interface IRequest {
  id: string,
  name: string,
  cnpj: string,
  category: string,
  description: string,
  services: string[],
  physical_localization: boolean,
  telephone: string,
  whatsapp: string,
  email: string,
  website: string,
  address?: Address,
}

interface IAddress {
  cep: string;
  street: string;
  district: string;
  number: number;
  state: string;
  city: string;
}

interface IResponse {
  id: string;
  name: string;
  cnpj: string;
  category: string;
  description: string;
  services: string[];
  telephone: string;
  whatsapp: string;
  email: string;
  website: string
  physical_localization: boolean;
  address: IAddress;
}

@injectable()
export class UpdateCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("ContactsRepository")
    private contactRepository: IContactsRepository,

    @inject("AddressesRepository")
    private addressRepository: IAddressesRepository

  ) { }

  public async execute({
    id,
    name,
    cnpj,
    category,
    description,
    services,
    physical_localization,
    telephone,
    whatsapp,
    email,
    website,
    address
  }: IRequest): Promise<IResponse> {

    const findCompanyById = await this.companyRepository.findById(id);

    if (!findCompanyById) {
      throw new AppError("Company does not exist!");
    }

    const checkCompanyExists = await this.companyRepository.findByName(name);

    if (checkCompanyExists && checkCompanyExists.id !== id) {
      throw new AppError("Company name already used!");
    }

    if (physical_localization && address === undefined) {
      throw new AppError("Address is required");
    }

    const contact = await this.contactRepository.update({
      id: findCompanyById.contact_id,
      telephone,
      email,
      website,
      whatsapp
    });

    const company = await this.companyRepository.update({
      id: findCompanyById.id,
      name,
      cnpj,
      category,
      description,
      services,
      physical_localization,
      contact_id: contact.id,
      user_id: findCompanyById.user_id
    });

    const addressId = await this.addressRepository.findAddressByCompany(findCompanyById.id);

    if (company.physical_localization && !addressId) {
      await this.addressRepository.create({
        cep: address.cep,
        street: address.street,
        district: address.district,
        number: address.number,
        state: address.state,
        city: address.city,
        company_id: company.id
      });
    } else if (company.physical_localization && addressId) {
      await this.addressRepository.update({
        id: addressId.id,
        cep: address.cep,
        street: address.street,
        district: address.district,
        number: address.number,
        state: address.state,
        city: address.city,
        company_id: company.id
      });
    } else if (!company.physical_localization && addressId) {
      await this.addressRepository.delete(addressId.id);
    }

    const response = {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      category: company.category,
      description: company.description,
      services: company.services,
      telephone: contact.telephone,
      whatsapp: contact.whatsapp,
      email: contact.email,
      website: contact.website,
      physical_localization: company.physical_localization,
      address
    };

    return response;
  }
}