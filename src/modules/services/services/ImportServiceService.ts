import { inject, injectable } from "tsyringe";

import { IXlsxProvider } from "@modules/categories/providers/XlsxProvider/models/IXlsxProvider";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { AppError } from "@shared/errors/AppError";

import { IServicesRepository } from "../repositories/IServicesRepository";

@injectable()
export class ImportServiceService {

  constructor(
    @inject("CompaniesRepository")
    private companyRepository: ICompaniesRepository,

    @inject("ServicesRepository")
    private serviceRepository: IServicesRepository,

    @inject("XlsxProvider")
    private xlsxProvider: IXlsxProvider
  ) { }

  public async execute(company_id: string, filePath: string): Promise<void> {

    const company = this.companyRepository.findById(company_id);

    if (!company) {
      throw new AppError("Company not found");
    }

    const services = this.xlsxProvider.readXlsxProvider(filePath);

    console.log(services);
  }
}