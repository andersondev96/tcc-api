import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AppError } from "@shared/errors/AppError";
import { getCEP } from "@shared/utils/getCEP";
import { getCoordinatesFromCEP } from "@shared/utils/getCoordinatesFromCEP";
import { getAddressFromCoordinates, getCurrentLocalization } from "@shared/utils/getCurrentLocalization";

import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";


interface IRequest {
  id: string,
  name: string,
  cnpj: string,
  category_id: string,
  description?: string,
  services?: string[],
  physical_localization: boolean,
  telephone: string,
  whatsapp?: string,
  email: string,
  website?: string,
  cep?: string;
  street?: string;
  district?: string;
  number?: number;
  state?: string;
  city?: string;
}

interface IResponse {
  id: string;
  name: string;
  cnpj?: string;
  category_id: string;
  description: string;
  services: string[];
  telephone: string;
  whatsapp: string;
  email: string;
  website: string
  physical_localization: boolean;
}

@injectable()
export class UpdateCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("CategoriesRepository")
    private categoryRepository: ICategoriesRepository,

    @inject("ContactsRepository")
    private contactRepository: IContactsRepository,

    @inject("AddressesRepository")
    private addressRepository: IAddressesRepository

  ) { }

  public async execute({
    id,
    name,
    cnpj,
    category_id,
    description,
    services,
    physical_localization,
    telephone,
    whatsapp,
    email,
    website,
    cep,
    street,
    district,
    number
  }: IRequest): Promise<IResponse> {

    const findCompanyById = await this.companyRepository.findById(id);

    if (!findCompanyById) {
      throw new AppError("Company does not exist!");
    }

    const checkCompanyExists = await this.companyRepository.findByName(name);

    if (checkCompanyExists && checkCompanyExists.id !== id) {
      throw new AppError("Company name already used!");
    }

    const checkCategoryExists = await this.categoryRepository.findCategoryById(category_id);

    if (!checkCategoryExists) {
      throw new AppError("Categories not found");
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
      category_id,
      description,
      services,
      physical_localization,
      contact_id: contact.id,
      user_id: findCompanyById.user_id
    });

    const addressId = await this.addressRepository.findAddressByCompany(findCompanyById.id);

    if (company.physical_localization) {
      const coords = await getCoordinatesFromCEP(cep);

      if (!coords) {
        throw new AppError("CEP not found");
      }

      const address = await getCEP(cep);

      await this.addressRepository.update({
        id: addressId.id,
        cep,
        street: address.street || street,
        district: address.district || district,
        number,
        state: address.state,
        city: address.city,
        latitude: coords.lat,
        longitude: coords.lng,
        company_id: company.id
      });
    }

    if (!company.physical_localization) {
      const coords = await getCurrentLocalization();

      if (coords) {
        const address = await getAddressFromCoordinates(coords);

        await this.addressRepository.update({
          id: addressId.id,
          cep: address.cep,
          street: address.street,
          district: address.district,
          number: null,
          state: address.state,
          city: address.city,
          latitude: coords.lat,
          longitude: coords.lng,
          company_id: company.id
        });
      }
    }

    const response = {
      id: company.id,
      name: company.name,
      cnpj: company.cnpj,
      category_id: company.category_id,
      description: company.description,
      services: company.services,
      telephone: contact.telephone,
      whatsapp: contact.whatsapp,
      email: contact.email,
      website: contact.website,
      physical_localization: company.physical_localization

    };

    return response;
  }
}