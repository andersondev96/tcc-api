import { inject, injectable } from "tsyringe";

import { IStorageProvider } from "@shared/container/providers/StorageProvider/models/IStorageProvider";
import { AppError } from "@shared/errors/AppError";

import { IAddressesRepository } from "../repositories/IAddressesRepository";
import { ICompaniesRepository } from "../repositories/ICompaniesRepository";
import { IContactsRepository } from "../repositories/IContactsRepository";
import { IImagesCompanyRepository } from "../repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "../repositories/ISchedulesRepository";

@injectable()
export class DeleteCompanyService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("ContactsRepository")
    private contactRepository: IContactsRepository,

    @inject("SchedulesRepository")
    private scheduleRepository: ISchedulesRepository,

    @inject("AddressesRepository")
    private addressRepository: IAddressesRepository,

    @inject("ImagesCompanyRepository")
    private imagesCompanyRepository: IImagesCompanyRepository,

    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  public async execute(company_id: string): Promise<void> {

    const company = await this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company does not exist");
    }

    const schedules = await this.scheduleRepository.findSchedulesByCompany(company_id);

    if (schedules) {
      await this.scheduleRepository.deleteAllSchedules(company_id);
    }

    const address = await this.addressRepository.findAddressByCompany(company_id);

    if (address) {
      await this.addressRepository.delete(address.id);
    }

    const images = await this.imagesCompanyRepository.findImagesByCompany(company_id);

    images.map((image) => {
      this.storageProvider.delete(image.image_name, "companies");
      this.imagesCompanyRepository.delete(image.id);
    });

    const contact = company.contact_id;

    await this.companyRepository.delete(company_id);

    await this.contactRepository.delete(contact);
  }
}