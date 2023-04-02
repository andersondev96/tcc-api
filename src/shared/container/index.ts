import "@modules/users/providers";
import { container } from "tsyringe";

import { AssessmentsRepository } from "@modules/assessments/infra/prisma/repositories/AssessmentsRepository";
import { IAssessmentsRepository } from "@modules/assessments/repositories/IAssessmentsRepository";
import { CategoriesRepository } from "@modules/categories/infra/prisma/repositories/CategoriesRepository";
import { XlsxProvider } from "@modules/categories/providers/XlsxProvider/implementations/XlsxProvider";
import { IXlsxProvider } from "@modules/categories/providers/XlsxProvider/models/IXlsxProvider";
import { ICategoriesRepository } from "@modules/categories/repositories/ICategoriesRepository";
import { AddressesRepository } from "@modules/companies/infra/prisma/repositories/AddressesRepository";
import { CompaniesRepository } from "@modules/companies/infra/prisma/repositories/CompaniesRepository";
import { ContactsRepository } from "@modules/companies/infra/prisma/repositories/ContactsRepository";
import { ImagesCompanyRepository } from "@modules/companies/infra/prisma/repositories/ImagesCompanyRepository";
import { SchedulesRepository } from "@modules/companies/infra/prisma/repositories/SchedulesRepository";
import { IAddressesRepository } from "@modules/companies/repositories/IAddressesRepository";
import { ICompaniesRepository } from "@modules/companies/repositories/ICompaniesRepository";
import { IContactsRepository } from "@modules/companies/repositories/IContactsRepository";
import { IImagesCompanyRepository } from "@modules/companies/repositories/IImagesCompanyRepository";
import { ISchedulesRepository } from "@modules/companies/repositories/ISchedulesRepository";
import { CustomersCompaniesRepository } from "@modules/customers/infra/prisma/repositories/CustomersCompaniesRepository";
import { CustomersRepository } from "@modules/customers/infra/prisma/repositories/CustomersRepository";
import { ICustomersCompaniesRepository } from "@modules/customers/repositories/ICustomersCompaniesRepository";
import { ICustomersRepository } from "@modules/customers/repositories/ICustomersRepository";
import { EntrepreneursRepository } from "@modules/entrepreneurs/infra/prisma/repositories/EntrepreneursRepository";
import { EntrepreneursSettingsRepository } from "@modules/entrepreneurs/infra/prisma/repositories/EntrepreneursSettingsRepository";
import { IEntrepreneursRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursRepository";
import { IEntrepreneursSettingsRepository } from "@modules/entrepreneurs/repositories/IEntrepreneursSettingsRepository";
import { BudgetsRepository } from "@modules/proposals/infra/prisma/repositories/BudgetsRepository";
import { ProposalsRepository } from "@modules/proposals/infra/prisma/repositories/ProposalsRepository";
import { ServicesProposalsRepository } from "@modules/proposals/infra/prisma/repositories/ServicesProposalsRepository";
import { IBudgetsRepository } from "@modules/proposals/repositories/IBudgetsRepository";
import { IProposalsRepository } from "@modules/proposals/repositories/IProposalsRepository";
import { IServicesProposalsRepository } from "@modules/proposals/repositories/IServicesProposalsRepository";
import { ServicesRepository } from "@modules/services/infra/prisma/repositories/ServicesRepository";
import { IServicesRepository } from "@modules/services/repositories/IServicesRepository";
import { UsersRepository } from "@modules/users/infra/prisma/repositories/UsersRepository";
import { UsersTokenRepository } from "@modules/users/infra/prisma/repositories/UsersTokenRepository";
import { IUsersRepository } from "@modules/users/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";

import { EtherealMailProvider } from "./providers/MailProvider/implementations/EtherealMailProvider";
import { IMailProvider } from "./providers/MailProvider/models/IMailProvider";
import { LocalStorageProvider } from "./providers/StorageProvider/implementations/LocalStorageProvider";
import { IStorageProvider } from "./providers/StorageProvider/models/IStorageProvider";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
  "UsersTokenRepository",
  UsersTokenRepository
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerInstance<IStorageProvider>(
  "StorageProvider",
  new LocalStorageProvider()
);

container.registerInstance<ICompaniesRepository>(
  "CompaniesRepository",
  new CompaniesRepository()
);

container.registerInstance<IContactsRepository>(
  "ContactsRepository",
  new ContactsRepository()
);

container.registerInstance<ISchedulesRepository>(
  "SchedulesRepository",
  new SchedulesRepository()
);

container.registerInstance<IAddressesRepository>(
  "AddressesRepository",
  new AddressesRepository()
);

container.registerInstance<IImagesCompanyRepository>(
  "ImagesCompanyRepository",
  new ImagesCompanyRepository()
);

container.registerInstance<IServicesRepository>(
  "ServicesRepository",
  new ServicesRepository()
);

container.registerInstance<IEntrepreneursRepository>(
  "EntrepreneursRepository",
  new EntrepreneursRepository()
);

container.registerInstance<IAssessmentsRepository>(
  "AssessmentsRepository",
  new AssessmentsRepository()
);

container.registerInstance<ICustomersRepository>(
  "CustomersRepository",
  new CustomersRepository()
);

container.registerInstance<IProposalsRepository>(
  "ProposalsRepository",
  new ProposalsRepository()
);

container.registerInstance<IServicesProposalsRepository>(
  "ServicesProposalsRepository",
  new ServicesProposalsRepository()
);

container.registerInstance<IBudgetsRepository>(
  "BudgetsRepository",
  new BudgetsRepository()
);

container.registerInstance<ICustomersCompaniesRepository>(
  "CustomersCompaniesRepository",
  new CustomersCompaniesRepository()
);

container.registerInstance<IEntrepreneursSettingsRepository>(
  "EntrepreneursSettingsRepository",
  new EntrepreneursSettingsRepository()
);

container.registerInstance<ICategoriesRepository>(
  "CategoriesRepository",
  new CategoriesRepository()
);

container.registerInstance<IXlsxProvider>(
  "XlsxProvider",
  new XlsxProvider()
);